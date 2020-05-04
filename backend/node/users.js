const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcryptjs");


 function generateAccessToken(data, secret, expirationTimeSeconds) {
  if (expirationTimeSeconds == undefined) return jwt.sign(data, secret); //if no expiration date is specified, return token without expiration
  return jwt.sign(data, secret, { expiresIn: expirationTimeSeconds }); //token with expiration.
}
function hashPassword(password)
{
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

//This function takes a req and checks the token present in the headers.authorization property,
//if it is then it assigns the request a 'user' property.

async function authenticateToken(request, res, next) {
  //use this as the middleware.

  //request must contain the "authorization" object in the header.
  //the token is extracted from the authorization object.

  const header = request.headers["authorization"];
  const token = header && header.split(" ")[1];

  //if the token isn't present then send status code UNAUTHORIZED.
  if (token == null) return res.sendStatus(401);

  //verify the extracted token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
    //if err then send status code FORBIDDEN
    if (err) return res.sendStatus(403);

    //check if the token is still in the validkeys.json file.
    const obj = fs.readFile("../validkeys.json", (err, data) => {
      if (err) {
        return res.sendStatus(500); // INTERNAL SERVER ERROR.
      } else {
        obj = JSON.parse(obj.toString());

        //check the validkeys object for the property with the same name as the username.
        if (!obj.hasOwnProperty(request.body.user.username))
          return res.sendStatus(401); //if not found then send status code UNAUTHORIZED.
      }
    });

    //here all the checks pass and the token is valid.
    req.username = username; //set the username property to easily identify the user.
    next(); //call the callback.
  });
}

 function checkForumPassword(username, password, callback) {
  var client = new Client();
   client.connect(); //connect to DB

    const pwdhash = hashPassword(password);

    client.query(
    "SELECT pwd_hash FROM FORUMS WHERE forum_name= $1 ;",
    [username],
    (err, res) => {
      if (err) {
        client.end(); // kill the connection to DB
        return callback(err, undefined); //return with error.
      } else {
        if (res.rowCount === 1 && res.rows[0].pwd_hash === pwdhash) {
          //compare password hashes
          client.end();
          return callback(undefined, true); //if match, return with true.
        }
        client.end();
        return callback(undefined, false); //if no match, then return false.
      }
    }
  );
}

 function checkRegistrationStatus(forum_name, callback) {
  var client = new Client();
   client.connect();

  client.query(
    "SELECT forum_name FROM FORUMS WHERE forum_name= $1;",
    [forum_name],
    (err, res) => {
      if (err) {
        client.end();
        return callback(err, null);
      } else {
        if (res.rowCount === 0) {
          client.end();
          return callback(undefined, false);
        } else {
          client.end();
          return callback(undefined, true);
        }
      }
    }
  );
}
 function registerForum(forum_name, pwd_hash, email, phone, callback) {
  //returns status of registration (true or false)
  var client = new Client();
   client.connect();

  checkRegistrationStatus(forum_name, (err, res) => {
    if (res == true) {
      client.end();
      return callback(undefined, false);
    } else {
      client.query(
        "INSERT INTO forums(forum_name,pwd_hash,email,phone_no) VALUES ($1,$2,$3,$4);",
        [forum_name, pwd_hash, email, phone],
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
  hashPassword:hashPassword,
  checkRegistrationStatus: checkRegistrationStatus,
  registerForum: registerForum,
  generateAccessToken: generateAccessToken,
  authenticateToken: authenticateToken,
};
