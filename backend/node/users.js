require("dotenv").config();
const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");

function generateAccessToken(data, secret, expirationTimeSeconds) {
  if (expirationTimeSeconds == undefined) return jwt.sign(data, secret); //if no expiration date is specified, return token without expiration
  return jwt.sign(data, secret, { expiresIn: expirationTimeSeconds }); //token with expiration.
}
function hashPassword(password) {
  console.log("password is :" + password);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

//This function takes a req and checks the token present in the headers.authorization property,
//if it is then it assigns the request a 'user' property.

function authenticateToken(token, secret, callback) {
  //verify the extracted token
  jwt.verify(token, secret, (err, username) => {
    //if err then send status code FORBIDDEN
    if (err) return callback({ message: "access token incorrect!" }, undefined);

    //check if the token is still in the validkeys.json file.
    var data = fs.readFileSync("validkeys.json");
    data = data.toString();
    data = JSON.parse(data);
    if (!data.hasOwnProperty(username))
      return callback({ message: "UNIDENTIFIED USER" }, undefined);
    //here all the checks pass and the token is valid.

    return callback(undefined, username);
  });
}

async function checkForumPassword(username, password, callback) {
  var client = new Client();
  await client.connect().catch((err) => {
    console.log(err);
  }); //connect to DB

  if (!username || !password)
    return callback("USERNAME AND PASSWORD UNDEFINED!", undefined);

  client.query(
    "SELECT pwd_hash FROM FORUMS WHERE forum_name= $1 ;",
    [username],
    (err, res) => {
      if (err) {
        client.end(); // kill the connection to DB
        return callback(err, undefined); //return with error.
      } else {
        if (res.rowCount === 1) {
          bcrypt.compare(password, res.rows[0].pwd_hash, (err, status) => {
            //compare password hashes
            client.end();
            if (err) throw err;
            else if (!status) return callback(undefined, false);
            //if no match, then return false.
            else return callback(undefined, true); //if match, return with true.
          });
        } else {
          return callback("INVALID USERNAME OR PASSWORD", undefined);
        }
      }
    }
  );
}

function checkRegistrationStatus(forum_name, callback)
{
  var client = new Client();
  client.connect();

  client.query("SELECT forum_name FROM FORUMS WHERE forum_name= $1;",[forum_name],(err, res) => {
      if (err)
	  {
        client.end();
        return callback(err, null);
      } 
	  else
	  {
        if (res.rowCount === 0)
		{
          client.end();
          return callback(undefined, false);
        }
		else
		{
          client.end();
          return callback(undefined, true);
        }
      }
    });
}
function registerForum(forum_name, password, email, phone, callback) {
  //returns status of registration (true or false)
  var client = new Client();
  client.connect();

  const password_hash = hashPassword(password);

  checkRegistrationStatus(forum_name, (err, res) => {
    if (res == true) {
      client.end();
      return callback(undefined, false);
    } else {
      client.query(
        "INSERT INTO forums(forum_name,pwd_hash,email,phone_no) VALUES ($1,$2,$3,$4);",
        [forum_name, password_hash, email, phone],
        (err, res) => {
          if (err) {
            client.end();
            return callback(err, undefined);
          } else {
            client.end();
            return callback(undefined, true);
          }
        }
      );
    }
  });
}

module.exports = {
  checkForumPassword: checkForumPassword,
  hashPassword: hashPassword,
  checkRegistrationStatus: checkRegistrationStatus,
  registerForum: registerForum,
  generateAccessToken: generateAccessToken,
  authenticateToken: authenticateToken,
};
