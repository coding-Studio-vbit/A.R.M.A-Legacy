require("dotenv").config();
const users = require("./node/users.js");
const dataValidator = require("./node/dataValidator");
const mailSender = require("./node/mail-sender.js");
const requestQueries = require("./requestsQueries.js");
const { Client } = require("pg");
const fs = require("fs");

/*
	Endpoints:
	------------

	getForumDetails
	getFacultyDetails
	getRegisteredForums
	getFaculty
	getFacilities
	login
	loginFaculty
	logout
	forgotPassword
	facultydashboard
	createrequestPOST
	createrequestDELETE
	createrequestPUT
	approverequest
	forumdashboard
	getrequest
	checkRegistrationStatus
	checkFacultyRegistrationStatus
	registerForum
	registerFaculty
	TeamAttendance
	participantsattendance
	conductevent
	usehall
	campaigning
	conductmeet
	getUserType
	changeForumUsername
	changeFacultyUsername
	changeForumPassword
	changeFacultyPassword
	changeForumEmail
	changeFacultyEmail
*/

async function getFaculty(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((username) => {
        const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
        client.connect();
        client
          .query("SELECT faculty_name FROM faculty;")
          .then((data) => {
            var faculty = [];
            data.rows.forEach((row) => {
              faculty.push(row.faculty_name);
            });
            res.status = 200;
            res.response = { all_faculty: faculty };
            client.end();
            return resolve(res);
          })
          .catch((error) => {
            res.status = 500;
            res.response = { err: "Internal Database error" };
            client.end();
            return resolve(res);
          });
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}

async function getFacilities(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((username) => {
        const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
        client.connect();
        client
          .query("SELECT facility_name FROM facilities;")
          .then((data) => {
            var facilities = [];
            data.rows.forEach((row) => {
              facilities.push(row.facility_name);
            });
            res.status = 200;
            res.response = { all_facilities: facilities };
            client.end();
            return resolve(res);
          })
          .catch((error) => {
            res.status = 500;
            res.response = { err: "Internal Database error" };
            client.end();
            return resolve(res);
          });
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}

async function forgotPassword(req) {
  // non-authenticated endpoint.
  //expects userType, username, reg_email.

  return new Promise((resolve, reject) => {
    var res = {};
    if (!req.body.userType || !req.body.username || !req.body.reg_email) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments!" };
      return resolve(res);
    }
    users
      .forgotPassword(
        req.body.userType,
        req.body.username.toUpperCase(),
        req.body.reg_email
      )
      .then((state) => {
        res.status = 200;
        res.response = {
          message: "mail sent successfully to registered email.",
        };
        return resolve(res);
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}

async function getRegisteredForums(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
    client.connect();
    client
      .query("SELECT actual_name,forum_name FROM forums;")
      .then((data) => {
        client.end();
        res.status = 200;
        res.response = data.rows;
        return resolve(res);
      })
      .catch((error) => {
        res.status = 500;
        console.log(error);
        client.end();
        res.response = { err: "Internal Database Error" };
        return resolve(res);
      });
  });
}

async function getForumDetails(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object

    users
      .fetchAccessToken(req)
      .then((token) =>
        users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN)
      )
      .then((username) => {
        const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
        client.connect();
        client
          .query(
            "SELECT actual_name,email,phone_no FROM forums WHERE forum_name=$1",
            [username]
          )
          .then((data) => {
            if (data.rows.length === 0) {
              res.status = 200;
              res.response = {
                actual_name: " ",
                email: " ",
                phone_no: " ",
              };
              return resolve(res);
            } else {
              res.status = 200;
              res.response = {
                actual_name: data.rows[0].actual_name,
                email: data.rows[0].email,
                phone_no: data.rows[0].phone_no,
              };
              return resolve(res);
            }
          }) // successful data retrieval.
          .catch((err) => {
            console.log(err);
            res.status = 500;
            res.response = { err: "Internal Database Error" };
            return resolve(res);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}
async function loginForums(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.user || !req.body.user.username || !req.body.user.password) {
      res.status = 400;
      res.response = { err: "Invalid number of fields!" };
      return resolve(res);
    } else {
      users
        .checkForumPassword(req.body.user.username, req.body.user.password)
        .then((state) => {
          if (state) {
            users
              .generateAccessToken(
                req.body.user.username.toUpperCase(),
                process.env.SECRET_ACCESS_TOKEN
              )
              .then((token) => {
                res.status = 200;
                res.response = {
                  message: "USERNAME: " + req.body.user.username.toUpperCase(),
                  accessToken: token,
                };

                var obj = fs.readFileSync("./validkeys.json");
                obj = obj.toString();
                obj = JSON.parse(obj);
                //create a new property with the username with the value as an object and the user type
                obj[req.body.user.username.toUpperCase()] = {
                  accessToken: token,
                  userType: "FORUM",
                };
                //save the data.
                fs.writeFileSync("validkeys.json", JSON.stringify(obj));
                return resolve(res);
              })
              .catch((err) => {
                console.log(err);
                res.status = 500;
                res.response = { err: "Couldnt generate AccessToken" };
                return resolve(res);
              });
          } else {
            res.status = 200;
            res.response = { err: "Invalid Password" };
            return resolve(res);
          }
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}

async function loginFaculty(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object

    if (!req.body.user || !req.body.user.username || !req.body.user.password) {
      res.status = 400;
      res.response = { err: "Invalid number of fields" };
      return resolve(res);
    } else {
      users
        .checkFacultyPassword(req.body.user.username, req.body.user.password)
        .then((state) => {
          if (state) {
            users
              .generateAccessToken(
                req.body.user.username.toUpperCase(),
                process.env.SECRET_ACCESS_TOKEN
              )
              .then((token) => {
                res.status = 200;
                res.response = {
                  message: "USERNAME: " + req.body.user.username.toUpperCase(),
                  accessToken: token,
                };
                var obj = fs.readFileSync("./validkeys.json");
                obj = obj.toString();
                obj = JSON.parse(obj);
                obj[req.body.user.username.toUpperCase()] = {
                  accessToken: token,
                  userType: "FACULTY",
                };
                //save the data.
                fs.writeFileSync("validkeys.json", JSON.stringify(obj));
                return resolve(res);
              })
              .catch((error) => {
                console.log(error);
                res.status = 500;
                res.response = { err: "Couldnt generate Access token!" };
                return resolve(res);
              });
          } else {
            res.status = 200;
            res.response = { err: "Invalid password" };
            return resolve(res);
          }
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}

async function logout(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    //if check token, remove the token from validkeys.json and redirect to login page.
    //For logout the request should have both the username and the access token.
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((username) => {
        var obj = fs.readFileSync("validkeys.json");
        obj = JSON.parse(obj.toString());
        if (obj.hasOwnProperty(username)) {
          delete obj[username.toUpperCase()];
          res.status = 200;
          res.response = { message: "LOGOUT SUCCESSFUL" };
          fs.writeFileSync("validkeys.json", JSON.stringify(obj));
          return resolve(res);
        } else {
          res.status = 401;
          res.response = { err: "CANNOT LOGOUT WITHOUT LOGIN!" }; //UNAUTHORIZED. Can't logout without login.
          return resolve(res);
        }
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}
async function facultyDashboard(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((faculty_roll) => {
        faculty_roll = faculty_roll.toUpperCase();
        const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
        client.connect();
        client
          .query(
            "select request_id,forum_name,remarks,status, request_data->'subject' as subject from requests where request_id in (select request_id from recipients where faculty_roll=$1)",
            [faculty_roll]
          )
          .then((data) => {
            res.status = 200;
            res.response = data.rows;
            client.end();
            return resolve(res);
          })
          .catch((err) => {
            res.status = 500;
            res.response = { err: "Internal Database Error!" };
            console.log(err);
            client.end();
            return resolve(res);
          });
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}
async function makeNewRequest(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.recipients || !req.body.request_data) {
      res.status = 400;
      res.response = { err: "Invalid number of fields" };
      return resolve(res);
    }
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((username) => {
        var unique_id = "";
        for (let a = 0; a < 10; a++) {
          unique_id += String(Math.round(Math.random() * 10) % 10);
        }

        console.log("Unique ID: ", unique_id); //DEBUG

        var forum_name = username.toUpperCase();
        var recipients = [];
        if (!req.body.recipients || !req.body.recipients.length)
          throw "Invalid recipients!";

        for (let i = 0; i < req.body.recipients.length; i++) {
          const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
          client.connect();
          client
            .query("select faculty_roll from faculty where faculty_name=$1", [
              req.body.recipients[i],
            ])
            .then((data) => {
              if (data.rows.length != 0)
                recipients.push(data.rows[0].faculty_roll);
            })
            .catch((error) => {
              console.log(error);
              res.status = 500;
              res.response = { err: "Internal Database Error!" };
              return resolve(res);
            });
        }
        requestQueries.addRequest(
          forum_name,
          unique_id,
          req.body.request_data,
          recipients,
          (error, status) => {
            if (error) {
              console.log(error);
              res.status = 500;
              res.response = { err: "Internal Database Server" };
              return resolve(res);
            }
          }
        );
        res.status = 200;
        res.response = { message: "request sent successfully!" };
        return resolve(res);
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}
async function deleteRequest(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.request_id) {
      res.status = 400;
      res.response = { err: "Invalid number of fields!" };
      resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          var data = fs.readFileSync("validkeys.json");
          data = data.toString();
          data = JSON.parse(data);

          if (
            data.hasOwnProperty(username) &&
            data[username].userType == "FORUM"
          ) {
            //only forums can delete their requests.
            requestQueries.deleteRequest(
              req.body.request_id,
              username,
              (error, status) => {
                console.log(error, status);
                if (error) {
                  throw error;
                }
              }
            );
            res.status = 200;
            res.response = {
              message: "Deleted!!",
            };
            return resolve(res);
          } else {
            res.status = 400;
            res.response = { err: "say what??" };
            return resolve(res);
          }
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}
async function updateRequest(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((username) => {
        //get user type.

        var fileData = fs.readFileSync("validkeys.json");
        fileData = JSON.parse(fileData.toString());
        const userType = fileData[username].userType;

        if (userType == "FORUM") {
          //user is forum
          //ignore status update, and remarks update. So we make them undefined
          //check if the request_id is their own.this is done in the changeRequest query itself.
          requestQueries.changeRequest(
            username,
            req.body.request_data,
            undefined,
            undefined,
            req.body.request_id,
            (error, status) => {
              console.log(error, status);
              if (error) {
                throw { err: error };
              }
            }
          );
          res.status = 200;
          res.response = { message: "Updated successfully!" };
          return resolve(res);
        } else {
          //user is faculty
          //update status and remarks
          //check if request_id is their own.
          const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
          client.connect();
          client
            .query(
              "SELECT request_id from requests WHERE request_id=$1 AND request_id IN (SELECT request_id from recipients WHERE faculty_roll=$2)",
              [req.body.request_id, username]
            )
            .then((data) => {
              if (data.rows.length == 0) {
                res.status = 401;
                res.response = { err: "Unauthorized!" };
                client.end();
                return resolve(res);
              }
              client.end();
              requestQueries.changeRequest(
                req.body.forum_name,
                req.body.request_data,
                req.body.status,
                req.body.remarks,
                req.body.request_id,
                (error, status) => {
                  console.log(error, status);
                  if (error) {
                    throw { err: error };
                  } else {
                    res.status = 200;
                    res.response = { message: "Update Successful" };
                    return resolve(res);
                  }
                }
              );
            })
            .catch((error) => {
              res.status = 500;
              res.response = { err: "Internal Database error!" };
              return resolve(res);
            });
        }
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}
async function approveRequest(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.request_id || !req.body.status) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments!" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          var data = fs.readFileSync("validkeys.json");
          data = data.toString();
          data = JSON.parse(data);
          if (
            data.hasOwnProperty(username) &&
            data[username].userType == "FACULTY"
          ) {
            //only faculty can approve or reject.
            const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
            client.connect();
            client
              .query(
                "update requests set status = $1 where request_id=$2 AND request_id IN (select request_id from recipients where faculty_roll=$3)",
                [req.body.status, req.body.request_id, username]
              )
              .then((data) => {
                if (data.rowCount === 0) {
                  res.status = 400;
                  res.response = {
                    err: "No such rows found",
                  };
                  return resolve(res);
                } else {
                  client.end();
                  res.status = 200;
                  res.response = { message: "approved", msg: data };
                  return resolve(res);
                }
              })
              .catch((error) => {
                res.status = 500;
                res.response = { err: "Internal Database Error" };
                console.log(error);
                return resolve(res);
              });
          } else {
            res.status = 400;
            res.response = { err: "Bad request" };
            return resolve(res);
          }
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}
async function forumsDashboard(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((forum_name) => {
        forum_name = forum_name.toUpperCase();
        const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
        client.connect();
        client
          .query(
            "select request_id,remarks,status, request_data->'subject' as subject from requests where forum_name=$1",
            [forum_name]
          )
          .then((data) => {
            res.status = 200;
            res.response = data.rows;
            client.end();
            return resolve(res);
          })
          .catch((err) => {
            res.status = 500;
            res.response = { err: "Internal Database error!" };
            console.log(err);
            client.end();
            return resolve(res);
          });
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}
async function fetchRequest(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.query || !req.query.request_id) {
      res.status = 400;
      res.response = { err: "Invalid number of fields" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
          client.connect();
          client
            .query("select * from requests where request_id=$1", [
              req.query.request_id,
            ])

            .then((data) => {
              if (data.rowCount === 0) {
                client.end();
                res.status = 200;
                res.response = { err: "No such rows found!" };
                return resolve(res);
              } else {
                res.status = 200;
                res.response = data.rows;
                client.end();
                return resolve(res);
              }
            })
            .catch((err) => {
              res.status = 500;
              res.response = { err: "Internal Database error" };
              console.log(err);
              client.end();
              return resolve(res);
            });
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}
async function checkForumRegistrationStatus(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.query || !req.body.query.username) {
      res.status = 400;
      res.response = { err: "No query or username property!" };
      return resolve(res);
    } else {
      users
        .checkRegistrationStatus(req.body.query.username.toUpperCase())
        .then((state) => {
          res.status = 200;
          res.response = { message: state };
          return resolve(res);
        })
        .catch((error) => {
          console.log(error);
          res.status = 500;
          res.response = { err: "Internal database error!" };
          return resolve(res);
        });
    }
  });
}
async function checkFacultyRegistrationStatus(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.query || !req.body.query.username) {
      res.status = 400;
      res.response = { err: "No query or username property!" };
      return resolve(res);
    } else {
      users
        .checkFacultyRegistrationStatus(req.body.query.username.toUpperCase())
        .then((state) => {
          res.status = 200;
          res.response = { message: state };
          return resolve(res);
        })
        .catch((error) => {
          console.log(error);
          res.status = 500;
          res.response = { err: "Internal Database Error!" };
          return resolve(res);
        });
    }
  });
}
async function registerForum(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    const data = req.body.registrationData;
    if (!data) {
      res.status = 200;
      res.response = { err: { errmessage: "No registrationData field!" } };
      return resolve(res);
    } else if (!data.username || !data.phone || !data.email) {
      res.status = 200;
      res.response = { err: { errmessage: "Invalid number of arguments" } };
      return resolve(res);
    } else {
      dataValidator
        .validateRegistrationData(data)
        .then((ok) => {
          return users.checkRegistrationStatus(data.username);
        })
        .then((state) => {
          if (state) {
            res.status = 200;
            res.response = { message: "User has already registered" };
            return resolve(res);
          } else {
            res.status = 200;
            res.response = { message: "Response recorded" };
            mailSender
              .sendMail(
                "Registration Notification",
                "Your request has been recorded. You will be contacted shortly :)",
                data.email
              )
              .then(() => {
                //nothing. Mail is sent to forum.
              })
              .catch((error) => {
                res.status = 200;
                res.response = {
                  err: {
                    errmessage: "error sending mail to user" + data.email,
                  },
                };
                console.log("Error sending mail to user :" + data.email, error);
                return resolve(res);
              })
              .then(() => {
                return mailSender.sendMail(
                  "Registration Request",
                  JSON.stringify(data),
                  process.env.USERMAIL
                );
              })
              .then(() => {
                //nothing. We get the mail.
              })
              .catch((error) => {
                res.status(500);
                res.reponse = {
                  err: { errmessage: "Server couldnt register request!" },
                };
                console.log("Error sending mail to self", error);
              })
              .then(() => {
                return users.newForumRegistrationRequest(
                  data.username,
                  data.phone,
                  data.email
                );
              })
              .then((ok) => {
                console.log("NEW REGISTRATION REQUEST RECEIVED!");
                return resolve(res);
              })
              .catch((error) => {
                res.status = 500;
                res.response = { err: "server couldnt register forum!" };
                console.log(
                  "error inserting new forum registration data!",
                  error
                );
                return resolve(res);
              });
          }
        })
        .catch((error) => {
          res.status = 200;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}
async function registerFaculty(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    const data = req.body.registrationData;
    if (!data) {
      res.status = 200;
      res.response = { err: { errmessage: "No registrationData field!" } };
      return resolve(res);
    } else if (
      !data.faculty_name ||
      !data.faculty_phone ||
      !data.faculty_email ||
      !data.faculty_dept ||
      !data.faculty_roll
    ) {
      res.status = 200;
      res.response = { err: { errmessage: "Invalid number of arguments" } };
      return resolve(res);
    } else {
      dataValidator
        .validateFacultyRegistrationData(data)
        .then((ok) => {
          return users.checkFacultyRegistrationStatus(data.faculty_roll);
        })
        .then((state) => {
          if (state) {
            res.status = 200;
            res.response = { message: "User has already registered" };
            return resolve(res);
          } else {
            res.status = 200;
            res.response = { message: "Response recorded" };
            mailSender
              .sendMail(
                "Registration Notification",
                "Your request has been recorded. You will be contacted shortly :)",
                data.faculty_email
              )
              .then(() => {
                //nothing. Mail is sent to faculty.
              })
              .catch((error) => {
                res.status = 200;
                res.response = {
                  err: {
                    errmessage: "error sending mail to user" + data.email,
                  },
                };

                console.log(
                  "Error sending mail to user :" + data.faculty_email,
                  error
                );
                return resolve(res);
              })
              .then(() => {
                return mailSender.sendMail(
                  "Registration Request",
                  JSON.stringify(data),
                  process.env.USERMAIL
                );
              })
              .then(() => {
                //nothing. We get the mail.
              })
              .catch((error) => {
                res.status = 500;
                res.reponse = {
                  err: { errmessage: "Server couldnt register request!" },
                };
                console.log("Error sending mail to self", error);
                return resolve(res);
              })
              .then(() => {
                return users.newFacultyRegistrationRequest(
                  data.faculty_name,
                  data.faculty_dept,
                  data.faculty_roll.toUpperCase(),
                  data.faculty_email,
                  data.faculty_phone
                );
              })
              .then((ok) => {
                console.log("NEW REGISTRATION REQUEST RECEIVED!");
                return resolve(res);
              })
              .catch((error) => {
                res.status = 500;
                res.response = { err: "error registering new faculty!" };
                console.log(
                  "error inserting new faculty registration data!",
                  error
                );
                return resolve(res);
              });
          }
        })
        .catch((error) => {
          res.status = 200;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}
async function getUserType(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((username) => {
        var fileData = fs.readFileSync("validkeys.json");
        fileData = fileData.toString();
        fileData = JSON.parse(fileData);
        if (!fileData.hasOwnProperty(username.toUpperCase())) {
          res.status = 400;
          res.response = { err: "User isnt logged in!" };
          return resolve(res);
        } else {
          const { userType } = fileData[username.toUpperCase()];
          res.status = 200;
          res.response = { userType: userType };
          return resolve(res);
        }
      })
      .catch((error) => {
        res.status = 400;
        res.response = { err: error };
        return resolve(res);
      });
  });
}
async function changeForumUsername(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.newUsername) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments!" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          return users.changeForumUsername(username, req.body.newUsername);
        })
        .then((ok) => {
          res.status = 200;
          res.response = { message: "UPDATE SUCCESSFUL" };
          return resolve(res);
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          console.log("changeForumUsername error!", error);
          return resolve(res);
        });
    }
  });
}
async function changeFacultyUsername(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.newUsername) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments!" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          return users.changeFacultyUsername(username, req.body.newUsername);
        })
        .then((ok) => {
          res.status = 200;
          res.response = { message: "UPDATE SUCCESSFUL" };
          return resolve(res);
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          console.log("changeFacultyUSername error!", error);
          return resolve(res);
        });
    }
  });
}
async function changeForumPassword(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.newPassword || !req.body.oldPassword) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments!" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          return users.changeForumPassword(
            username,
            req.body.oldPassword,
            req.body.newPassword
          );
        })
        .then((ok) => {
          res.status = 200;
          res.response = { message: "UPDATE SUCCESSFUL" };
          return resolve(res);
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          console.log("changeForumPassword error!", error);
          return resolve(res);
        });
    }
  });
}
async function changeFacultyPassword(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.newPassword || !req.body.oldPassword) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          return users.changeFacultyPassword(
            username,
            req.body.oldPassword,
            req.body.newPassword
          );
        })
        .then((ok) => {
          res.status = 200;
          res.response = { message: "UPDATE SUCCESSFUL" };
          return resolve(res);
        })
        .catch((error) => {
          console.log("changeFAcultyPAssword error!", error);
          res.status = 400;
          res.response = { err: error };
          return resolve(res);
        });
    }
  });
}
async function changeForumEmail(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.newEmail) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments!" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          return users.changeForumEmail(username, req.body.newEmail);
        })
        .then((ok) => {
          res.status = 200;
          res.response = {
            message: "UPDATE SUCCESSFUL",
          };
          return resolve(res);
        })
        .catch((error) => {
          res.status = { err: error };
          console.log("changeForumEmail error!", error);
          return resolve(res);
        });
    }
  });
}
async function changeFacultyEmail(req) {
  return new Promise((resolve, reject) => {
    var res = {};
    //set status, set response object
    if (!req.body.newEmail) {
      res.status = 400;
      res.response = { err: "Invalid number of arguments!" };
      return resolve(res);
    } else {
      users
        .fetchAccessToken(req)
        .then((token) => {
          return users.authenticateToken(
            token,
            process.env.SECRET_ACCESS_TOKEN
          );
        })
        .then((username) => {
          return users.changeFacultyEmail(username, req.body.newEmail);
        })
        .then((ok) => {
          res.status = 2000;
          res.response = { message: "UPDATE SUCCESSFUL" };
          return resolve(res);
        })
        .catch((error) => {
          res.status = 400;
          res.response = { err: error };
          console.log("changeFacultyEmail error!", error);
          return resolve(res);
        });
    }
  });
}
async function getFacultyDetails(req) {
  return new Promise((resolve, reject) => {
    var res = {};

    users
      .fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((username) => {
        const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
        client.connect();

        client
          .query(
            "SELECT faculty_name, faculty_dept, faculty_roll, email, phone_no from faculty where faculty_roll=$1",
            [username]
          )
          .then((data) => {
            res.status = 200;
            res.response = data.rows[0];
            return resolve(res);
          })
          .catch((error) => {
            res.status = 500;
            res.response = { err: "Internal Database Error" };
            console.log(error);
            return resolve(res);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status = 400;
        res.response = error;
        return resolve(res);
      });
  });
}

module.exports = {
  getForumDetails,
  loginForums,
  loginFaculty,
  logout,
  forgotPassword,
  facultyDashboard,
  makeNewRequest,
  deleteRequest,
  updateRequest,
  approveRequest,
  forumsDashboard,
  fetchRequest,
  checkForumRegistrationStatus,
  checkFacultyRegistrationStatus,
  registerForum,
  registerFaculty,
  getUserType,
  changeForumUsername,
  changeFacultyUsername,
  changeForumPassword,
  changeFacultyPassword,
  changeForumEmail,
  changeFacultyEmail,
  getFacultyDetails,
  getRegisteredForums,
  getFaculty,
  getFacilities,
};
