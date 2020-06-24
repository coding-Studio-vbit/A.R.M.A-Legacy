//Author: bsaikiran618

const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const mailSender = require('./mail-sender.js')
//--------------------------------------------------------//
//-----------TOKEN HANDLING-------------------------------//
//--------------------------------------------------------//

async function fetchAccessToken(request) {
  return new Promise((resolve, reject) => {
    if (!request.headers["authorization"]) {
      return reject("No Authorization field found in the header!");
    }

    var token_parts = request.headers["authorization"].split(" ");

    if (token_parts[0] == "Bearer" && token_parts[1]) {
      return resolve(token_parts[1]);
    }
    return reject("Malformed Auth token!");
  });
}

async function generateAccessToken(data, secret, expirationTimeSeconds) {
  return new Promise((resolve, reject) => {
    if (expirationTimeSeconds == undefined)
      return resolve(jwt.sign(data, secret)); //return token without expiration
    return resolve(
      jwt.sign(data, secret, { expiresIn: expirationTimeSeconds })
    ); //token with expiration.
  });
}

//--------------------------------------------------------//
//-----------TOKEN AUTHENTICATION-------------------------//
//--------------------------------------------------------//

//This function takes a req and checks the token present in the headers.authorization property,
//if it is then it assigns the request a 'user' property.

async function authenticateToken(token, secret) {
  return new Promise((resolve, reject) => {
    //verify the extracted token
    jwt.verify(token, secret, (err, username) => {
      //if err then send status code FORBIDDEN
      if (err) return reject("access token incorrect!");

      //check if the token is still in the validkeys.json file.
      var data = fs.readFileSync("validkeys.json");
      data = data.toString();
      data = JSON.parse(data);
      if (!data.hasOwnProperty(username) || data[username].accessToken!=token) return reject("UNIDENTIFIED USER OR INCORRECT TOKEN");
      //here all the checks pass and the token is valid.
      return resolve(username);
    });
  });
}

//--------------------------------------------------------//
//-----------PASSWORD HANDLING----------------------------//
//--------------------------------------------------------//
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return resolve(hash);
  });
}

async function checkForumPassword(username, password) {
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();

    username = username.toUpperCase();

    if (!username || !password) {
      client.end();
      return reject("USERNAME AND PASSWORD UNDEFINED!");
    }
    client
      .query("SELECT pwd_hash FROM FORUMS WHERE forum_name= $1 ;", [username])
      .then((res) => {
        if (res.rowCount === 1) {
          bcrypt.compare(password, res.rows[0].pwd_hash, (err, status) => {
            //compare password hashes
            client.end();
            if (err) throw err;
            else if (!status) return resolve(false);
            //if no match, then return false.
            else return resolve(true); //if match, return with true.
          });
        } else {
          return reject("INVALID USERNAME OR PASSWORD");
        }
      })
      .catch((err) => reject(err));
  });
}

async function checkFacultyPassword(faculty_roll, password) {
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();

    if (!faculty_roll || !password) {
      client.end();
      return reject("USERNAME AND PASSWORD UNDEFINED!");
    }

    faculty_roll = faculty_roll.toUpperCase();

    client
      .query("SELECT pwd_hash FROM faculty WHERE faculty_roll=$1;", [
        faculty_roll,
      ])
      .then((res) => {
        if (res.rowCount === 1) {
          bcrypt.compare(password, res.rows[0].pwd_hash, (err, status) => {
            //compare password hashes
            client.end();
            if (err) throw err;
            else if (!status) return resolve(false);
            //if no match, then return false.
            else return resolve(true); //if match, return with true.
          });
        } else {
          return reject("INVALID USERNAME OR PASSWORD");
        }
      })
      .catch((err) => reject(err));
  });
}

async function generateTempPassword()
{
	return new Promise((resolve, reject)=>{
		let tempPass = "";
  		for (let a = 0; a < 10; a++) {
  		  tempPass += String(Math.round(Math.random() * 10)%10);
  		}
  		return resolve(tempPass);
	})
}

async function forgotPassword(userType, username, reg_email)
{
	return new Promise((resolve, reject)=>{

			if(userType == "FACULTY")
			{
				//query the username in the faculty table
				const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
				client.connect();
				client.query("SELECT email FROM faculty WHERE faculty_roll=$1",[username])
				.then(data=>{
					if(data.rows.length == 0)
					{
						client.end();
						return reject("Invalid faculty roll!");
					}
					var email = data.rows[0].email;
					var tempPass = "";
					if(email !=reg_email) return reject("Registered email is Invalid!");
					generateTempPassword()
					.then(password=>{
						tempPass = password;
						return hashPassword(password)
					})
					.then(hash=>{
						client.query("UPDATE faculty SET pwd_hash=$1 WHERE faculty_roll=$2",[hash,username])
						.then(state=>{
							//nothing. Password is updated.
						})
						.catch(error=>{
						client.end();
							console.log(error)
							return reject("Database error!");
						})
						return mailSender.sendMail(
							"ARMA PASSWORD RESET",
							("Hey there!, You can login to ARMA using the temporary password: " + tempPass),
							email
						);
					})
					.then((mailStatus)=>{
						client.end();
						return resolve();
					})
					.catch(error=>{
						client.end();
						console.log(error)
						return reject("error updating new password!");
					})
				})
				.catch(error=>{
						client.end();
					console.log(error);
					return reject(error);
				})
			}
			else if(userType == "FORUM")
			{
				//query the username in the forums table
				const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
				client.connect();
				client.query("SELECT email FROM forums WHERE forum_name=$1",[username])
				.then(data=>{
					if(data.rows.length == 0)
					{
						return reject("Invalid forum name!");
					}
					var email = data.rows[0].email;
					var tempPass = ""
					if(email !=reg_email) return reject("Registered email is Invalid!");
					generateTempPassword()
					.then(password=>{
						tempPass = password;
						return hashPassword(password)
					})
					.then(hash=>{
						client.query("UPDATE forums SET pwd_hash=$1 WHERE forum_name=$2",[hash, username])
						.then(state=>{
							//nothing. Password is updated.
						})
						.catch(error=>{
						client.end();
							console.log(error);
							return reject("Database error!");
						})
						return mailSender.sendMail(
							"ARMA PASSWORD RESET",
							"Hey there!, You can login to ARMA using the temporary password: " + tempPass,
							email
						);
					})
					.then((mailStatus)=>{
						client.end();
						return resolve(mailStatus);
					})
					.catch(error=>{
						client.end();
						console.log(error);
						return reject("error hashing new password!");
					})
				})
				.catch(error=>{
						client.end();
					console.log(error);
					return reject(error);
				})
			}
	});
}

//--------------------------------------------------------//
//-----------REGISTRATION HANDLING------------------------//
//--------------------------------------------------------//

async function checkRegistrationStatus(forum_name) {
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    forum_name = forum_name.toUpperCase();
    client
      .query("SELECT forum_name FROM FORUMS WHERE forum_name= $1;", [
        forum_name,
      ])
      .then((res) => {
        if (res.rowCount === 0) {
          client.end();
          return resolve(false);
        } else {
          client.end();
          return resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
}
async function checkFacultyRegistrationStatus(faculty_roll) {
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();

    faculty_roll = faculty_roll.toUpperCase();

    client
      .query("SELECT * FROM Faculty WHERE faculty_roll= $1;", [faculty_roll])
      .then((res) => {
        if (res.rowCount === 0) {
          client.end();
          return resolve(false);
        } else {
          client.end();
          return resolve(true);
        }
      })
      .catch((err) => reject(err));
  });
}

// REGISTER FORUM (PRIVATE USE ONLY)

async function registerForum(forum_name, password, email, phone) {
  //returns status of registration (true or false)

  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    checkRegistrationStatus(forum_name)
      .then((res) => {
        if (res == true) {
          client.end();
          return resolve(false);
        } else {
          hashPassword(password)
            .then((password_hash) => {
              client
                .query(
                  "INSERT INTO forums(forum_name,pwd_hash,email,phone_no,actual_name) VALUES ($1,$2,$3,$4,$5);",
                  [
                    forum_name.toUpperCase(),
                    password_hash,
                    email,
                    phone,
                    forum_name,
                  ]
                )
                .then((res) => {
                  client.end();
                  return resolve(true);
                })
                .catch((err) => reject(err));
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((err) => reject(err));
  });
}

//REGISTER FACULTY (PRIVATE USE ONLY)
async function registerFaculty(
  faculty_name,
  faculty_roll,
  faculty_dept,
  email,
  phone,
  password
) {
  //returns status of registration (true or false)

  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();

    faculty_roll = faculty_roll.toUpperCase();

    checkFacultyRegistrationStatus(faculty_roll)
      .then((res) => {
        if (res == true) {
          client.end();
          return resolve(false);
        } else {
          hashPassword(password)
            .then((password_hash) => {
              client
                .query(
                  "INSERT INTO faculty(faculty_name,faculty_roll,faculty_dept,email,phone_no,pwd_hash) VALUES ($1,$2,$3,$4,$5,$6);",
                  [
                    faculty_name,
                    faculty_roll,
                    faculty_dept,
                    email,
                    phone,
                    password_hash,
                  ]
                )
                .then((res) => {
                  client.end();
                  return resolve(true);
                })
                .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err) => reject(err));
  });
}

async function newFacultyRegistrationRequest(
  faculty_name,
  faculty_dept,
  faculty_roll,
  email,
  phone
) {
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    client
      .query(
        "INSERT INTO faculty_registration_request(faculty_name,faculty_dept,faculty_roll,email,phone) VALUES($1,$2,$3,$4,$5)",
        [faculty_name, faculty_dept, faculty_roll, email, phone]
      )
      .then((res) => {
        client.end();
        return resolve(true);
      })
      .catch((err) => reject(err));
  });
}

async function newForumRegistrationRequest(forum_name, phone, email) {
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    client
      .query(
        "INSERT INTO forum_registration_request(forum_name,email,phone) VALUES($1,$2,$3)",
        [forum_name, email, phone]
      )
      .then((res) => {
        client.end();
        return resolve(true);
      })
      .catch((err) => reject(err));
  }); //end promise
}

//--------------------------------------------------------//
//---------------USER CREDENTIAL UPDATE-------------------//
//--------------------------------------------------------//

async function changeForumUsername(forum_name, newUsername) {
  //changes the forum name.

  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    forum_name = forum_name.toUpperCase();
    client
      .query("UPDATE forums SET actual_name=$1 WHERE forum_name=$2", [
        newUsername,
        forum_name,
      ])
      .then((data) => {
        client.end();
        return resolve(true); //successful update of username.
      })
      .catch((err) => reject(err));
  });
}
async function changeFacultyUsername(faculty_roll, newUsername) {
  //changes the faculty name

  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();

    faculty_roll = faculty_roll.toUpperCase();

    client
      .query("UPDATE faculty SET faculty_name=$1 WHERE faculty_roll=$2", [
        newUsername,
        faculty_roll,
      ])
      .then((data) => {
        client.end();
        return resolve(true);
      })
      .catch((err) => reject(err));
  });
}
async function changeForumPassword(forum_name, oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    //changes the forum password
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    forum_name = forum_name.toUpperCase();
    //first confirm old password
    client
      .query("SELECT pwd_hash from forums where forum_name=$1", [forum_name])
      .then((data) => {
        if (data.rows.length == 0) return reject("Unknown forum name");

        bcrypt.compare(oldPassword, data.rows[0].pwd_hash, (err, stat) => {
          if (err) {
            return reject(err);
          }
          if (!stat) return reject(" old password incorrect!");

          //old password is correct.
          hashPassword(newPassword)
            .then((newPasswordHash) => {
              client
                .query("UPDATE forums SET pwd_hash=$1 WHERE forum_name=$2", [
                  newPasswordHash,
                  forum_name,
                ])
                .then((data) => {
                  client.end();
                  return resolve(true); //successful password update.
                })
                .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
        });
      })
      .catch((err) => reject(err));
  });
}
async function changeFacultyPassword(faculty_roll, oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    //changes the faculty password
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();

    faculty_roll = faculty_roll.toUpperCase();
    //first confirm old password

    client
      .query("SELECT pwd_hash from faculty where faculty_roll=$1", [
        faculty_roll,
      ])
      .then((data) => {
        if (data.rows.length == 0) return reject("Unknown faculty roll");

        bcrypt.compare(oldPassword, data.rows[0].pwd_hash, (err, stat) => {
          if (err) {
            return reject(err);
          }
          if (!stat) return reject(" old password incorrect!");
          //old password is correct.
          hashPassword(newPassword)
            .then((newPasswordHash) => {
              client
                .query("UPDATE faculty SET pwd_hash=$1 WHERE faculty_roll=$2", [
                  newPasswordHash,
                  faculty_roll,
                ])
                .then((data) => {
                  client.end();
                  return resolve(true); //successful password update.
                })
                .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
        });
      })
      .catch((err) => reject(err));
  }); //end promise
}
async function changeForumEmail(forum_name, newEmail) {
  //changes the forum's registered email
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    forum_name = forum_name.toUpperCase();
    client
      .query("UPDATE forums SET email=$1 WHERE forum_name=$2;", [
        newEmail,
        forum_name,
      ])
      .then((data) => {
        client.end();
        return resolve(true); //successful update.
      })
      .catch((err) => reject(err));
  }); //end promise
}
async function changeFacultyEmail(faculty_roll, newEmail) {
  //changes the faculty's registered email
  return new Promise((resolve, reject) => {
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    faculty_roll = faculty_roll.toUpperCase();
    client
      .query("UPDATE faculty SET email=$1 WHERE faculty_roll=$2;", [
        newEmail,
        faculty_roll,
      ])
      .then((data) => {
        client.end();
        return resolve(true); //successful update.
      })
      .catch((err) => reject(err));
  }); //end promise
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
  forgotPassword: forgotPassword
};
