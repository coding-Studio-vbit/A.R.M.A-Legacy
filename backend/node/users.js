const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");

//--------------------------------------------------------//
//-----------TOKEN HANDLING-------------------------------//
//--------------------------------------------------------//

function fetchAccessToken(request, callback) {
  if (!request.headers.authorization) {
    return callback("No Authorization field found in the header!", undefined);
  }

  var token_parts = request.headers.authorization.split(" ");

  if (token_parts[0] == "Bearer" && token_parts[1]) {
    return callback(undefined, token_parts[1]);
  }
  return callback("Malformed Auth token!", undefined);
}

function generateAccessToken(data, secret, expirationTimeSeconds) {
  if (expirationTimeSeconds == undefined) return jwt.sign(data, secret); //if no expiration date is specified, return token without expiration
  return jwt.sign(data, secret, { expiresIn: expirationTimeSeconds }); //token with expiration.
}

//--------------------------------------------------------//
//-----------TOKEN AUTHENTICATION-------------------------//
//--------------------------------------------------------//

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

//--------------------------------------------------------//
//-----------PASSWORD HANDLING----------------------------//
//--------------------------------------------------------//
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

async function checkForumPassword(username, password, callback) {
  var client = new Client();
  await client.connect().catch((err) => {
    console.log(err);
  }); //connect to DB

  username = username.toUpperCase();

  if (!username || !password) {
    client.end();
    return callback("USERNAME AND PASSWORD UNDEFINED!", undefined);
  }
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

async function checkFacultyPassword(faculty_roll, password, callback) {
  var client = new Client();
  await client.connect().catch((err) => {
    console.log(err);
  }); //connect to DB

  if (!faculty_roll || !password) {
    client.end();
    return callback("USERNAME AND PASSWORD UNDEFINED!", undefined);
  }

  faculty_roll = faculty_roll.toUpperCase();

  client.query(
    "SELECT pwd_hash FROM faculty WHERE faculty_roll= $1 ;",
    [faculty_roll],
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

//--------------------------------------------------------//
//-----------REGISTRATION HANDLING------------------------//
//--------------------------------------------------------//

function checkRegistrationStatus(forum_name, callback) {
  var client = new Client();
  client.connect();

  forum_name = forum_name.toUpperCase();

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
function checkFacultyRegistrationStatus(faculty_roll, callback) {
  var client = new Client();
  client.connect();

  faculty_roll = faculty_roll.toUpperCase();

  client.query(
    "SELECT * FROM Faculty WHERE faculty_roll= $1;",
    [faculty_roll],
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

// REGISTER FORUM (PRIVATE USE ONLY)

function registerForum(forum_name, password, email, phone, callback) {
  //returns status of registration (true or false)
  var client = new Client();
  client.connect();

  forum_name = forum_name.toUpperCase();

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

//REGISTER FACULTY (PRIVATE USE ONLY)
function registerFaculty(
  faculty_name,
  faculty_roll,
  faculty_dept,
  email,
  phone,
  password,
  callback
) {
  //returns status of registration (true or false)
  var client = new Client();
  client.connect();

  faculty_roll = faculty_roll.toUpperCase();

  const password_hash = hashPassword(password);

  checkFacultyRegistrationStatus(faculty_roll, (err, res) => {
    if (res == true) {
      client.end();
      return callback(undefined, false);
    } else {
      client.query(
        "INSERT INTO faculty(faculty_name,faculty_roll,faculty_dept,email,phone_no,pwd_hash) VALUES ($1,$2,$3,$4,$5,$6);",
        [faculty_name, faculty_roll, faculty_dept, email, phone, password_hash],
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

function newFacultyRegistrationRequest(
  faculty_roll,
  faculty_name,
  faculty_dept,
  phone,
  email,
  callback
) {
  var client = new Client();
  client.connect();
  client.query(
    "INSERT INTO faculty_registration_request(faculty_name,faculty_dept,faculty_roll,email,phone) VALUES($1,$2,$3,$4,$5)",
    [faculty_roll, faculty_name, faculty_dept, email, phone],
    (err, res) => {
      client.end();
      if (err) return callback(err, undefined);
      return callback(undefined, true);
    }
  );
}
function newForumRegistrationRequest(forum_name, phone, email, callback) {
  var client = new Client();
  client.connect();
  client.query(
    "INSERT INTO forum_registration_request(forum_name,email,phone) VALUES($1,$2,$3)",
    [forum_name, email, phone],
    (err, res) => {
      client.end();
      if (err) return callback(err, undefined);
      return callback(undefined, true);
    }
  );
}

//--------------------------------------------------------//
//---------------USER CREDENTIAL UPDATE-------------------//
//--------------------------------------------------------//

function changeForumUsername(forum_name, newUsername, callback) {
  //changes the forum name.

  try {
    var client = new Client();
    client.connect();

    forum_name = forum_name.toUpperCase();

    client.query(
      "UPDATE forums SET forum_name=$1 WHERE forum_name=$2",
      [newUsername, forum_name],
      (err, data) => {
        if (err) {
          client.end();
          console.log("Error updating forum_name!", err);
          return callback(err, undefined); //update failed.
        }
        client.end();
        return callback(undefined, true); //successful update of username.
      }
    );
  } catch (err) {
    console.log(err);
    return callback(err, undefined);
  }
}
function changeFacultyUsername(faculty_roll, newUsername, callback) {
  //changes the faculty name

  try {
    var client = new Client();
    client.connect();

    faculty_roll = faculty_roll.toUpperCase();

    client.query(
      "UPDATE faculty SET faculty_name=$1 WHERE faculty_roll=$2",
      [newUsername, faculty_roll],
      (err, data) => {
        if (err) {
          client.end();
          console.log("error updating faculty name", err);
          return callback(err, undefined);
        }
        client.end();
        return callback(undefined, true);
      }
    );
  } catch (err) {
    console.log(err);
    return callback(err, undefined);
  }
}
function changeForumPassword(forum_name, oldPassword, newPassword, callback) {
  //changes the forum password
  try {
    var client = new Client();
    client.connect();

    forum_name = forum_name.toUpperCase();
    //first confirm old password

    client.query(
      "SELECT pwd_hash from forums where forum_name=$1",
      [forum_name],
      (err, data) => {
        if (err) {
          client.end();
          console.log("error SELECT-ing pwd_hash in forums table", err);
          return callback(err, undefined);
        }
        if (data.rows.length == 0)
          return callback("Unknown forum name", undefined);

        bcrypt.compare(oldPassword, data.rows[0].pwd_hash, (err, stat) => {
          if (err) {
            console.log(err);
            callback(err, undefined);
          }
          if (!stat) return callback(" old password incorrect!", undefined);

          //old password is correct.
          const newPasswordHash = hashPassword(newPassword);
          client.query(
            "UPDATE forums SET pwd_hash=$1 WHERE forum_name=$2",
            [newPasswordHash, forum_name],
            (err, data) => {
              if (err) {
                client.end();
                console.log("Error updating forum password", err);
                return callback(err, undefined);
              }
              client.end();
              return callback(undefined, true); //successful password update.
            }
          );
        });
      }
    );
  } catch (err) {
    console.log(err);
    return callback(err, undefined);
  }
}
function changeFacultyPassword(
  faculty_roll,
  oldPassword,
  newPassword,
  callback
) {
  //changes the faculty password
  try {
    var client = new Client();
    client.connect();

    faculty_roll = faculty_roll.toUpperCase();
    //first confirm old password

    client.query(
      "SELECT pwd_hash from faculty where faculty_roll=$1",
      [faculty_roll],
      (err, data) => {
        if (err) {
          client.end();
          console.log("error SELECT-ing pwd_hash in faculty table", err);
          return callback(err, undefined);
        }
        if (data.rows.length == 0)
          return callback("Unknown faculty roll", undefined);

        bcrypt.compare(oldPassword, data.rows[0].pwd_hash, (err, stat) => {
          if (err) {
            console.log(err);
            callback(err, undefined);
          }
          if (!stat) return callback(" old password incorrect!", undefined);

          //old password is correct.
          const newPasswordHash = hashPassword(newPassword);
          client.query(
            "UPDATE faculty SET pwd_hash=$1 WHERE faculty_roll=$2",
            [newPasswordHash, faculty_roll],
            (err, data) => {
              if (err) {
                client.end();
                console.log("Error updating forum password", err);
                return callback(err, undefined);
              }
              client.end();
              return callback(undefined, true); //successful password update.
            }
          );
        });
      }
    );
  } catch (err) {
    console.log(err);
    return callback(err, undefined);
  }
}
function changeForumEmail(forum_name, newEmail, callback) {
  //changes the forum's registered email
  try {
    var client = new Client();
    client.connect();

    forum_name = forum_name.toUpperCase();
    client.query(
      "UPDATE forums SET email=$1 WHERE forum_name=$2;",
      [newEmail, forum_name],
      (err, data) => {
        if (err) {
          client.end();
          console.log("Error updating forum email", err);
          return callback(err, undefined);
        }
        client.end();
        return callback(undefined, true); //successful update.
      }
    );
  } catch (err) {
    console.log(err);
    return callback(err, undefined);
  }
}
function changeFacultyEmail(faculty_roll, newEmail, callback) {
  //changes the faculty's registered email
  try {
    var client = new Client();
    client.connect();

    faculty_roll = faculty_roll.toUpperCase();
    client.query(
      "UPDATE faculty SET email=$1 WHERE faculty_roll=$2;",
      [newEmail, faculty_roll],
      (err, data) => {
        if (err) {
          client.end();
          console.log("Error updating faculty email", err);
          return callback(err, undefined);
        }
        client.end();
        return callback(undefined, true); //successful update.
      }
    );
  } catch (err) {
    console.log(err);
    return callback(err, undefined);
  }
}

//_____END__OF__MODULE_____//

module.exports = {
  fetchAccessToken: fetchAccessToken,
  checkForumPassword: checkForumPassword,
  checkFacultyPassword: checkFacultyPassword,
  hashPassword: hashPassword,
  checkRegistrationStatus: checkRegistrationStatus,
  checkFacultyRegistrationStatus: checkFacultyRegistrationStatus,
  registerForum: registerForum,
  registerFaculty: registerFaculty,
  generateAccessToken: generateAccessToken,
  authenticateToken: authenticateToken,
  newFacultyRegistrationRequest: newFacultyRegistrationRequest,
  newForumRegistrationRequest: newForumRegistrationRequest,
  changeForumUsername: changeForumUsername,
  changeForumPassword: changeForumPassword,
  changeForumEmail: changeForumEmail,
  changeFacultyUsername: changeFacultyUsername,
  changeFacultyPassword: changeFacultyPassword,
  changeFacultyEmail: changeFacultyEmail,
};
