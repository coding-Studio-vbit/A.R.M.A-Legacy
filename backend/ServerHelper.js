require('dotenv').config()
const users = require("./node/users.js");
const dataValidator =  require("./node/dataValidator");
const mailSender = require("./node/mail-sender.js");


/*
	Endpoints:
	------------

	getForumDetails
	login
	loginFaculty
	logout
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

function getForumDetails(req)
{
	var res = {};
	//set status, set response object
	
  users
    .fetchAccessToken(req)
    .then((token) =>
      users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN)
    )
    .then(() => {
      var client = new Client();
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
            }
          }
		  else
		  {
			  res.status = 200;
		 	  res.response = {
           	 	actual_name: data.rows[0].actual_name,
           		email: data.rows[0].email,
         		phone_no: data.rows[0].phone_no,
          	  };
		  }
        }) // successful data retrieval.
        .catch((err) => {
          console.log(err);
          res.status = 500;
		  res.response = { err: "Internal Database Error" };
        });
    })
    .catch((error) => {
      console.log(error);
	  res.status = 400;
	  res.response = {err: error};
    });

	return res;
}
function loginForums(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.user || !req.body.user.username || !req.body.user.password)
  {
  	res.status = 400;
	res.response = {err: "Invalid number of fields!"};
  } 
 else
 {
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
          })
          .catch((err) => {
            console.log(err);
			res.status = 500;
			res.response = {err: "Couldnt generate AccessToken"}
          });
      } else {
        res.status =200;
		res.response = { err: "Invalid Password" };
      }
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err:error};
    });
	}
	return res;
}

function loginFaculty(req)
{
	var res = {};
	//set status, set response object

  if (!req.body.user || !req.body.user.username || !req.body.user.password)
  {
  	res.status = 400;
	res.response = {err: "Invalid number of fields"}
  }
  else
  {
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
          })
          .catch((error) => {
            console.log(error);
			res.status = 500;
			res.response = { err: "Couldnt generate Access token!" };
          });
      } else {
	  res.status = 200;
	  res.response = {err: "Invalid password"};
      }
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err: error};
    });
  }
	return res;
}

function logout(req)
{
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
		res.response = {message: "LOGOUT SUCCESSFUL"};
      	fs.writeFileSync("validkeys.json", JSON.stringify(obj));
      }else
	  {
	  	res.status = 401;
		res.response = { err: "CANNOT LOGOUT WITHOUT LOGIN!" }; //UNAUTHORIZED. Can't logout without login.
	  }
    })
    .catch((error) => {
		res.status =400;
		res.response = {err:error}
    });
	return res;
}
function facultyDashboard(req)
{
	var res = {};
	//set status, set response object
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((faculty_roll) => {
      faculty_roll = faculty_roll.toUpperCase();
      var client = new Client();
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
        })
        .catch((err) => {
		  res.status = 500;
		  res.response = {err: "Internal Database Error!"};
          console.log(err);
          client.end();
        });
    })
    .catch((error) => {
	  res.status = 400;
	  res.response = {err: error}
    });
	return res;
}
function makeNewRequest(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.recipients || !req.body.request_data)
  {
  	res.status = 400;
	res.response = {err:"Invalid number of fields"};
  }
  else
  {
  	
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
        var client = new Client();
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
			res.response = {err:"Internal Database Error!"};
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
			res.response = {err: "Internal Database Server"};
          }
        }
      );
	  res.status = 200;
	  res.response = {message: "request sent successfully!"};
    })
    .catch((error) => {
	  res.status = 400;
	  res.response = {err: error};
    });
  }
	return res;
}
function deleteRequest(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.request_id)
  {
 	res.status = 400;
	res.response = {err: "Invalid number of fields!"};
  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      var data = fs.readFileSync("validkeys.json");
      data = data.toString();
      data = JSON.parse(data);

      if (data.hasOwnProperty(username) && data[username].userType == "FORUM") {
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
			message: "Deleted!!"
		};
      } else {
	  	res.status = 400;
		res.response ={err : "say what??"};
      }
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err: error};
    });
  }
	return res;
}
function updateRequest(req)
{
	var res = {};
	//set status, set response object
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
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
          }
        }
      );
	  res.status = 200;
	  res.response = {message: "Updated successfully!"};
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err:error};
    });
	return res;
}
function approveRequest(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.request_id || !req.body.status)
  {
 	res.status = 400;
	res.response = {err:"Invalid number of arguments!"};
  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
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
        var client = new Client();
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
					err:"No such rows found";
				}
            }
			else
			{
            	client.end();
				res.status = 200;
				res.response = {message: "approved", msg:data};
			}
          })
          .catch((error) => {

		  	res.status = 500;
			res.response = {err: "Internal Database Error"};
            console.log(error);
          });
      } else {
	  	res.status = 400;
		res.response = {err: "Bad request"};
      }
    })
    .catch((error) => {
	  res.status = 400;
	  res.response = {err:error}
    });
  }
	return res;
}
function forumsDashboard(req)
{
	var res = {};
	//set status, set response object
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((forum_name) => {
      forum_name = forum_name.toUpperCase();
      var client = new Client();
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
        })
        .catch((err) => {
		  res.status = 500;
		  res.response = {err:"Internal Database error!"};
          console.log(err);
          client.end();
        });
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err: error}
    });
	return res;
}
function fetchRequest(req)
{
	var res = {};
	//set status, set response object
  if (!req.query || !req.query.request_id)
  {
  	res.status = 400;
	res.response = {err:"Invalid number of fields"};
  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      var client = new Client();
      client.connect();
      client

        .query("select * from requests where request_id=$1", [
          req.body.request_id,
        ])

        .query("select * from requests where request_id=$1", [
          req.query.request_id,
        ])

        .then((data) => {
          if (data.rowCount === 0) {
            client.end();
			res.status = 200;
			res.response = {err:"No such rows found!"}
          }
		  else
		  {
		  	res.status = 200;
			res.response = data.rows;
          	client.end();
		  }
        })
        .catch((err) => {
		  res.status = 500;
		  res.response = {err:"Internal Database error"};
          console.log(err);
          client.end();
        });
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err:error}
    });
  }
	return res;
}
function checkForumRegistrationStatus(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.query || !req.body.query.username)
  {
  	res.status = 400;
	res.response = {err:"No query or username property!"};
  }
  else
  {
  users
    .checkRegistrationStatus(req.body.query.username.toUpperCase())
    .then((state) => {
		res.status = 200;
		res.response = {message:state}
    })
    .catch((error) => {
      console.log(error);
	  res.status = 500;
	  res.response = {err:"Internal database error!"};
    });
  }
	return res;
}
function checkFacultyRegistrationStatus(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.query || !req.body.query.username)
  {
  	res.status = 400;
	res.response = {err:"No query or username property!"}
  }
  else
  {
  	
  users
    .checkFacultyRegistrationStatus(req.body.query.username.toUpperCase())
    .then((state) => {
		res.status = 200;
		res.response = {message:state};
    })
    .catch((error) => {
      console.log(error);
	  res.status = 500;
	  res.response = {err:"Internal Database Error!"};
    });
  }
	return res;
}
function registerForum(req)
{
	var res = {};
	//set status, set response object
  const data = req.body.registrationData;
  if (!data)
  {
 	res.status = 400;
	res.response = {err: "No registrationData field!"};
  }
  else if (!data.username || !data.phone || !data.email)
  {
  	res.status =400;
	res.response = {err:"Invalid number of arguments"};
  }
  else
  {
  	
  dataValidator
    .validateRegistrationData(data)
    .then((ok) => {
      return users.checkRegistrationStatus(data.username);
    })
    .then((state) => {
      if (state)
	  {
	  	res.status = 200;
		res.response = {message: "User has already registered"}
	  }
	  else {
	  	res.status = 200;
		res.response = {message: "Response recorded"};
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
		  	res.status = 400;
			res.response = {err:"error sending mail to user"+data.email}
            console.log("Error sending mail to user :" + data.email, error);
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
		  res.reponse = {"Server couldnt register request!"};
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
          })
          .catch((error) => {
		  res.status = 500;
		  res.response = {err:"server couldnt register forum!"}
            console.log("error inserting new forum registration data!", error);
          });
      }
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err:error}
    });
  }
	return res;
}
function registerFaculty(req)
{
	var res = {};
	//set status, set response object
  const data = req.body.registrationData;
  if (!data)
  {
  	res.status = 400;
	res.response = {err:"No registrationData field!"};
  }
  else if (
    !data.faculty_name ||
    !data.faculty_phone ||
    !data.faculty_email ||
    !data.faculty_dept ||
    !data.faculty_roll
  )
  {
  res.status = 400;
  res.response = {err:"Invalid number of arguments!"}
  }
  else
  {
  	
  dataValidator
    .validateFacultyRegistrationData(data)
    .then((ok) => {
      return users.checkFacultyRegistrationStatus(data.faculty_roll);
    })
    .then((state) => {
      if (state)
	  {
	  res.status = 200;
	  res.response = {message: "User has already registered"};
	  }
      else {
		res.status = 200;
		res.response = {message: "Response recorded"};
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
		  res.status = 400;
		  res.response = {err:"Error sending mail to user!"};

            console.log(
              "Error sending mail to user :" + data.faculty_email,
              error
            );
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
			res.response = {
				err: "Error registering user!"
			}
            console.log("Error sending mail to self", error);
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
          })
          .catch((error) => {
		  res.status = 500;
		  res.response = {err:"error registering new faculty!"}
            console.log(
              "error inserting new faculty registration data!",
              error
            );
          });
      }
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err:error}
    });
  }
	return res;
}
function getUserType(req)
{
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
		res.response = {err:"User isnt logged in!"};
      }
	  else
	  {
      const { userType } = fileData[username.toUpperCase()];
       res.status = 200;
	   res.response = { userType: userType }
	  }
    })
    .catch((error) => {
		res.status =400;
		res.response = {err:error}
    });
	return res;
}
function changeForumUsername(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.newUsername)
  {
  	res.status = 400;
	res.response = {err:"Invalid number of arguments!"}
  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      return users.changeForumUsername(username, req.body.newUsername);
    })
    .then((ok) => {
		res.status = 200;
		res.response = {message:"UPDATE SUCCESSFUL"};
    })
    .catch((error) => {
	  res.status = 400;
	  res.response = {err:error}
      console.log("changeForumUsername error!", error);
    });
  }
	return res;
}
function changeFacultyUsername(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.newUsername)
  {
  	res.status = 400;
	res.response = {err: "Invalid number of arguments!"}
  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      return users.changeFacultyUsername(username, req.body.newUsername);
    })
    .then((ok) => {
		res.status = 200;
		res.response = {message: "UPDATE SUCCESSFUL"}
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err:error}
      console.log("changeFacultyUSername error!", error);
    });
  }
	return res;
}
function changeForumPassword(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.newPassword || !req.body.oldPassword)
  {
   res.status = 400;
   res.response = {err:"Invalid number of arguments!"};
  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
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
	 res.response = {message: "UPDATE SUCCESSFUL"}
    })
    .catch((error) => {
	  res.status = 400;
	  res.response = {err:error}
      console.log("changeForumPassword error!", error);
    });
  }
	return res;
}
function changeFacultyPassword(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.newPassword || !req.body.oldPassword)
  {
  	res.status = 400;
	res.response = {err: "Invalid number of arguments"};

  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
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
		res.response = {message: "UPDATE SUCCESSFUL"};
    })
    .catch((error) => {
      console.log("changeFAcultyPAssword error!", error);
	  res.status = 400;
	  res.response = {err:error}
    });
  }
	return res;
}
function changeForumEmail(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.newEmail)
  {
  	res.status = 400;
	res.response = {err:"Invalid number of arguments!"};
  }
  else
  {
  	
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      return users.changeForumEmail(username, req.body.newEmail);
    })
    .then((ok) => {
		res.status = 200;
		res.response = {
			message: "UPDATE SUCCESSFUL"
		}
    })
    .catch((error) => {
		res.status = {err:error}
      	console.log("changeForumEmail error!", error);
    });
  }
	return res;
}
function changeFacultyEmail(req)
{
	var res = {};
	//set status, set response object
  if (!req.body.newEmail)
  {
  	res.status = 400;
	res.response = {err: "Invalid number of arguments!"};
  }
  else
  {
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      return users.changeFacultyEmail(username, req.body.newEmail);
    })
    .then((ok) => {
		res.status = 2000;
		res.response = {message:"UPDATE SUCCESSFUL"};
    })
    .catch((error) => {
		res.status = 400;
		res.response = {err:error}
	    console.log("changeFacultyEmail error!", error);
    });
  }
	return res;
}
module.exports = {
	
}
