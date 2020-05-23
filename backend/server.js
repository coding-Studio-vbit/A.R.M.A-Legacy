require("dotenv").config();
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const users = require("./node/users.js");
const dataValidator = require("./node/dataValidator.js");
const mailSender = require("./node/mail-sender.js");
const fs = require("fs");
const port_number = process.env.PORT || 8080; //PORT SPECIFIED IN THE .env file
const app = express();
const pool = require("./db");
//Letter Template
var PizZip = require("pizzip");
var Docxtemplater = require("docxtemplater");
var urlencodedParser = body_parser.urlencoded({ extended: true });
var jsonfile = require("jsonfile");
var file = "./details.json";
//Letter Path
var oc_attendance = require("./oc_attendance");
var campaigning = require("./campaigning");
var participantsattendance = require("./participantsattendance");
var conductevent = require("./conductevent");
var usehall = require("./usehall");
var { Client } = require("pg");
var requestQueries = require("./requestsQueries");
//var conductmeet = require('./Letter/conductmeet');

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

//express configuration
app.use(express.static(path.join(__dirname, "/public")));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
var cors = require("cors");
app.use(cors());
//LOGIN

app.post("/login", (req, res) => {
  //check password.
  try {
    users
      .checkForumPassword(
        req.body.user.username,
        req.body.user.password,
        (error, status) => {
          if (error) {
            console.log(error);
            return res.status(401).send({ err: error });
          } else if (status == true) {
            const accessToken = users.generateAccessToken(
              req.body.user.username.toUpperCase(),
              process.env.SECRET_ACCESS_TOKEN
            );

            res.send({
              message: "USERNAME: " + req.body.user.username.toUpperCase(),
              accessToken: accessToken,
            });
            console.log("token: " + accessToken);
            var obj = fs.readFileSync("./validkeys.json");
            obj = obj.toString();
            obj = JSON.parse(obj);

            //create a new property with the username with the value as an object and the user type

            obj[req.body.user.username.toUpperCase()] = {
              accessToken: accessToken,
              userType: "FORUM",
            };

            //save the data.
            fs.writeFileSync("validkeys.json", JSON.stringify(obj));
          } else {
            return res.send({ err: "Invalid Password" }); //password wrong, return UNAUTHORIZED.
          }
        }
      )
      .catch((error) => {
        console.log(error);
        res.status(500).send({ err: "Internal Server Error" });
      });
  } catch (error) {
    res.status(400).json({ err: "BAD REQUEST" });
  }
});

//Faculty Login

app.post("/loginFaculty", (req, res) => {
  //check password.
  try {
    users
      .checkFacultyPassword(
        req.body.user.username,
        req.body.user.password,
        (error, status) => {
          if (error) {
            console.log(error);
            return res.status(401).send({ err: error });
          }
		  else if (status == true) {
            const accessToken = users.generateAccessToken(
              req.body.user.username.toUpperCase(),
              process.env.SECRET_ACCESS_TOKEN
            );
            res.send({
              message: "USERNAME: " + req.body.user.username.toUpperCase(),

              accessToken: accessToken,
            });
            console.log("token: " + accessToken);
            var obj = fs.readFileSync("./validkeys.json");
            obj = obj.toString();
            obj = JSON.parse(obj);

            obj[req.body.user.username.toUpperCase()] = {
              accessToken: accessToken,
              userType: "FACULTY",
            };

            //save the data.
            fs.writeFileSync("validkeys.json", JSON.stringify(obj));
          } else {
            return res.status(401).send({ err: "Invalid Password" }); //password wrong, return UNAUTHORIZED.
          }
        }
      )
      .catch((error) => {
        console.log(error);
        res.status(500).send({ err: "Internal Server Error" });
      });
  } catch (err) {
    res.status(400).json({ err: "BAD REQUEST" });
  }
});

//LOGOUT
// logout is same for both faculty and forums.

app.post("/logout", (req, res) => {
  //if check token, remove the token from validkeys.json and redirect to login page.
  //For logout the request should have both the username and the access token.

  try {

    	users.fetchAccessToken(req, (error, token) => {
     	  if (error) return res.status(400).json({ err:error });
			users.authenticateToken(token,process.env.SECRET_ACCESS_TOKEN, (error, username)=>
			{
			  if(error) return res.status(401).json({err:error.message});

    		  var obj = fs.readFileSync("validkeys.json");
    		  obj = JSON.parse(obj.toString());
    		  if (obj.hasOwnProperty(username) && obj[username].accessToken == token) {
    		    delete obj[username.toUpperCase()];
    		  }
			  else
    		    return res.status(401).send({ err: "CANNOT LOGOUT WITHOUT LOGIN!" }); //UNAUTHORIZED. Can't logout without login.
    		  res.send({ message: "LOGOUT SUCCESSFUL!" });
    		  fs.writeFileSync("validkeys.json", JSON.stringify(obj));
			});
    	});
  }catch (err) {
    console.log(err);
    res.status(400).json({ err: "BAD REQUEST" });
  }
});

//FACULTY DASHBOARD
//change to get
app.get("/facultydashboard", (req, res) => {
  users.fetchAccessToken(req, (err, token) => {
    if (err) return res.status(400).json({ err: "couldnt find any token!" });
    users.authenticateToken(
      token,
      process.env.SECRET_ACCESS_TOKEN,
      (err, faculty_roll) => {
        if (err) return res.status(400).json({ err: "Invalid Token!" });
        try {
          console.log(req.body);
          faculty_roll = faculty_roll.toUpperCase();
          //first get the faculty_id from faculty table.

          // var faculty_id = pool.query("select faculty_id from faculty where faculty_roll=$1",[username]);
          // faculty_id = faculty_id.rows[0].faculty_id;
          //now use this faculty id to get the requests of the faculty.
          var client = new Client();
          client.connect();
          client
            .query(
              "select forum_name,remarks,status, request_data->'subject' as subject from requests where request_id in (select request_id from recipients where faculty_roll=$1)",
              [faculty_roll]
            )
            .then((data) => {
              res.json(data.rows);
              console.log(data);
              client.end();
            })
            .catch((err) => {
              console.log(err);
              client.end();
            });
        } catch (err) {
          res.status(500).json({ err: "Internal Database Error!" });
          console.log(err);
        }
      }
    );
  });
});

app.post("/createrequest", (req, res) => {
  users.fetchAccessToken(req, (error, token) => {
    if (error) {
      return res.status(400).json({ err: error });
    }
    users.authenticateToken(
      token,
      process.env.SECRET_ACCESS_TOKEN,
      (error, username) => {
        if (error) {
          return res.status(400).json({ err: error });
        }
        var unique_id = "";
        for (let a = 0; a < 10; a++) {
          unique_id += String(Math.round(Math.random() * 10) % 10);
        }

        console.log("Unique ID: ", unique_id); //DEBUG

        var forum_name = username.toUpperCase();
        var recipients = [];

        try {
          if (!req.body.recipients || !req.body.recipients.length)
            throw "Invalid recipients!";

          for (let i = 0; i < req.body.recipients.length; i++) {
            var client = new Client();
            client.connect();
            client.query(
              "select faculty_roll from faculty where faculty_name=$1",
              [req.body.recipients[i]],
              (err, data) => {
                if (err) {
                  console.log(err);
                  //client.end();
                  throw err;
                }
                if (data.rows.length != 0)
                  recipients.push(data.rows[0].faculty_roll);
              }
            );
          }
          requestQueries.addRequest(
            forum_name,
            unique_id,
            req.body.request_data,
            recipients,
            (error, status) => {
              if (error) {
                console.log(error);
                return res
                  .status(500)
                  .json({ err: "Internal Server Error(database)" });
              }
            }
          );
          return res.send({ message: "request sent succesfully!" });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ err: error });
        }
      }
    );
  });
});

app.delete("/createrequest", (req, res) => {
  users.fetchAccessToken(req, (error, token)=>{
    if (error){
      return res.status(400).json({err: error})
    }
    users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN, (error,username) => {
      if (error){
        return res.status(400).json({err: error})
      }
	  if(!req.body.request_id) return res.status(400).json({err:'Invalid Request! :('});
     try{
	 	  
    	  var data = fs.readFileSync("validkeys.json");
    	  data = data.toString();
    	  data = JSON.parse(data);
		 
		  if(data.hasOwnProperty(username) && data[username].userType == 'FORUM') //only forums can delete their requests.
		  {
          	requestQueries.deleteRequest(req.body.request_id, username, ((error,status)=>{console.log(error,status); if(error){throw error}}))
         	return res.send({message: "Deleted!!"})
		  }
		  else
		  {
		  	return res.status(400).json({err:'Idi memu nishedinchali , meeru request delete cheyaleru'});
		  }
      }
      catch(error){
         console.log(error)
         return res.status(400).json({err: error})
      }
    })
  })
});

app.put("/createrequest", (req, res) => {
  users.fetchAccessToken(req, (error, token)=>{
    if (error){
      return res.status(400).json({err: error})
    }
    users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN, (error,username) => {
      if (error){
        return res.status(400).json({err: error})
      }
      var forum_name = username.toUpperCase()
	  if(!req.body.request_data || !req.body.status || !req.body.remarks || !req.body.request_id)
	  		return res.status(400).json({err: 'Invalid request. :('});
     try{
          requestQueries.changeRequest(forum_name, req.body.request_data, req.body.status, req.body.remarks, req.body.request_id,  (error,status)=> {console.log(error,status); if(error){throw {err:error}}})
          return res.send({message: "Updated succesfully!"})
      }
      catch(error){
         console.log(error)
         return res.status(400).json({err: error})
      }
    })
  })
});

app.post("/approverequest", (req,res) => {
	users.fetchAccessToken(req,(error,token)=>{
	if(error){
		return res.status(400).json({err:error});
	}
		users.authenticateToken(token,(error,username)=>{
			if(error){
				return res.status(400).json({err: error});
			}
			if(!req.body.status || !req.body.request_id) return res.status(400).json({err:'Invalid request! :('});

    	    var data = fs.readFileSync("validkeys.json");
    	    data = data.toString();
    	    data = JSON.parse(data);

		    if(data.hasOwnProperty(username) && data[username].userType == 'FACULTY') //only faculty can approve or reject.
		    {
		    	
  		      var client = new Client();
  		      client.connect();
  		      client.query('update requests set status = $1 where request_id=$2 AND faculty_roll=$3',[req.body.status, req.body.request_id,username],
  		      (error,data)=>{
  		          if(error){
  		            console.log(error);
  		            client.end();
  		            return res.status(400).json({ err: error });      
  		              // throw err;
  		          }
  		          if(data.rowCount === 0){
  		            return res.status(400).json({ err: "No such rows found" });      
  		          }
  		          client.end();
  		          return res.send({message: "approved", msg: data})
  		      })
		    }
		    else{
		    	return res.status(400).json({err:'Bad request, nice try.'});
		    }

		})
	})
});

app.get("/forumdashboard", async (req, res) => {
  users.fetchAccessToken(req, (err, token) => {
    if (err) return res.status(400).json({ err: "couldnt find any token!" });
    users.authenticateToken(
      token,
      process.env.SECRET_ACCESS_TOKEN,
      (err, forum_name) => {
        if (err) return res.status(400).json({ err: "Invalid Token!" });
        try {
          console.log(req.body);
          forum_name = forum_name.toUpperCase();
          var client = new Client();
          client.connect();
          client
            .query(
              "select remarks,status, request_data->'subject' as subject from requests where forum_name=$1",
              [forum_name]
            )
            .then((data) => {
              res.json(data.rows);
              console.log(data);
              client.end();
            })
            .catch((err) => {
              console.log(err);
              client.end();
            });
        } catch (err) {
          res.status(500).json({ err: "Internal Database Error!" });
          console.log(err);
        }
      }
    );
  });
});

app.get("/getrequest", async (req, res) => {
  users.fetchAccessToken(req, (err, token) => {
    if (err) return res.status(400).json({ err: "couldnt find any token!" });
    users.authenticateToken(
      token,
      process.env.SECRET_ACCESS_TOKEN,
      (err, forum_name) => {
        
		if (err) return res.status(400).json({ err: "Invalid Token!" });
		
		if(!req.body.request_id) return res.status(400).json({err:'Invalid request! :('});

        try {
          console.log(req.body);
          var client = new Client();
          client.connect();
          client
            .query(
              "select * from requests where request_id=$1",
              [req.body.request_id]
            )
            .then((data) => {
              if(data.rowCount === 0){
                client.end();
                return res.status(400).json({ err: "No such rows found" });      
              }
              res.json(data.rows);
              console.log(data);
              client.end();
            })
            .catch((err) => {
              console.log(err);
              client.end();
            });
        } catch (err) {
          res.status(500).json({ err: "Internal Database Error!" });
          console.log(err);

        }
      }
    );
  });
});

//app.get("/forumDashboard", async(req, res) => {
//  try {
//    console.log(req.body);
//    const data = await pool.query("select forum_id,forum_name,subject,status from requests where forum_id=2");
//    res.json(data.rows);
//  } catch (err) {
//    console.log(err.message);
//  }
//});

//REGISTRATION STATUS CHECK

//Remarks
app.post("/Remarks", (req, res) => {
  const remark = req.body;
  console.log(remark);
});

app.post("/checkRegistrationStatus", (req, res) => {
  try {
    const queryUsername = req.body.query.username.toUpperCase();
    if (!queryUsername) {
      return res.status(400).json({ err: "Username unspecified in query" });
    } else {
      users.checkRegistrationStatus(queryUsername, (error, state) => {
        if (error)
          return res.status(500).json({ err: "Internal Server Error" });
        else return res.json({ message: state });
      });
    }
  } catch (error) {
    return res.status(400).json({ err: "BAed REeKset" });
  }
});
//REGISTRATION STATUS CHECK FOR FACULTY

app.post("/checkFacultyRegistrationStatus", (req, res) => {
  try {
    const queryUsername = req.body.query.username.toUpperCase();
    if (!queryUsername) {
      return res.status(400).json({ err: "Username unspecified in query" });
    } else {
      users.checkFacultyRegistrationStatus(queryUsername, (error, state) => {
        if (error)
          return res.status(500).json({ err: "Internal Server Error" });
        else return res.json({ message: state });
      });
    }
  } catch (error) {
    return res.status(400).json({ err: "Bad Request" });
  }
});

//REGISTER FORUM REQUEST

app.post("/registerForum", (req, res) => {
  try {
    const data = req.body.registrationData;
    if (!data)
      return res.status(400).json({ err: "No registration data found!" });
    else
      dataValidator.validateRegistrationData(data, (error, ok) => {
        if (error) return res.json({ err: "Invalid Data!", errors: error });
        else {
          //check if user is already registered.

          users.checkRegistrationStatus(data.username, (error, state) => {
            if (error)
              return res
                .status(500)
                .json({ err: "Internal Server Database error!" });
            else if (state == true)
              res.json({ err: "User has already registered" });
            else {
              res.json({ message: "response recorded" });
              mailSender.sendMail(
                "Registration Notification",
                "Your Request has been recorded.You will be contacted shortly.",
                data.email,
                (error, res) => {
                  if (error) {
                    return console.log(
                      { err: "Error sending email to user." },
                      error
                    );
                  }
                }
              );

              mailSender.sendMail(
                "Registration Request",
                JSON.stringify(data),
                process.env.USERMAIL,
                (error, res) => {
                  if (error) {
                    return console.log(
                      { err: "Error sending email to self." },
                      error
                    );
                  }
                }
              );

              //now create a new record in the registration request table.
              users.newForumRegistrationRequest(
                data.username,
                data.email,
                data.phone,
                (error, st) => {
                  if (error)
                    return console.log(
                      error,
                      "Error inserting forum registration request into table!"
                    );
                  return console.log(
                    "new forum registration request received!"
                  );
                }
              );
            }
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "BAD REQUEST!" });
  }
});

//REGISTER FACULTY REQUEST
app.post("/registerFaculty", (req, res) => {
  //console.log(req.body.registrationData);
  try {
    const data = req.body.registrationData;
    console.log(data);
    if (!data)
      return res.status(400).json({ message: "No registration data found!" });
    else
      dataValidator.validateFacultyRegistrationData(data, (error, ok) => {
        if (error) return res.json({ err: "Invalid Data!", errors: error });
        else {
          //check if user is already registered.

          users.checkFacultyRegistrationStatus(
            data.faculty_roll,
            (error, state) => {
              if (error)
                return res
                  .status(500)
                  .json({ err: "Internal Server Database error!" });
              else if (state == true)
                res.json({ err: "User has already registered" });
              else {
                res.json({ message: "response recorded" });
                mailSender.sendMail(
                  "Registration Notification",
                  "Your Request has been recorded.You will be contacted shortly.",
                  data.faculty_email,
                  (error, res) => {
                    if (error) {
                      return console.log(
                        { err: "Error sending email to user." },
                        error
                      );
                    }
                  }
                );

                //sending mail to self.
                mailSender.sendMail(
                  "Registration Request",
                  JSON.stringify(data),
                  process.env.USERMAIL,
                  (error, res) => {
                    if (error) {
                      return console.log({
                        err: "Error sending email to self.",
                      });
                    }
                  }
                );

                //now create a new record in the registration request table.
                users.newFacultyRegistrationRequest(
                  data.faculty_name,
                  data.faculty_dept,
                  data.faculty_roll.toUpperCase(),
                  data.faculty_email,
                  data.faculty_phone,
                  (error, st) => {
                    if (error)
                      return console.log(
                        error,
                        "Error inserting faculty registration request into table!"
                      );
                    return console.log(
                      "new faculty registration request received!"
                    );
                  }
                );
              }
            }
          );
        }
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: "BAD REQUEST!" });
  }
});

//Letter

app.post("/TeamAttendance", urlencodedParser, function (req, res) {
  let designation = req.body.designation;
  let department = req.body.department;
  let subject = req.body.subject;
  let date = req.body.date;
  let respects = req.body.respects;
  let team_name = req.body.team_name;
  let event_name = req.body.event_name;
  let fromdate = req.body.fromdate;
  let todate = req.body.todate;
  let start_hour = req.body.start_hour;
  let start_min = req.body.start_min;
  let start_meridian = req.body.start_meridian;
  let end_hour = req.body.end_hour;
  let end_min = req.body.end_min;
  let end_meridian = req.body.end_meridian;
  let letter_body = req.body.letter_body;
  let studentdetails = req.body.studentdetails;

  console.log(req.body);
  let details = {
    designation: designation,
    department: department,
    subject: subject,
    date: date,
    respects: respects,
    team_name: team_name,
    event_name: event_name,
    fromdate: fromdate,
    todate: todate,
    start_hour: start_hour,
    start_min: start_min,
    start_meridian: start_meridian,
    end_hour: end_hour,
    end_min: end_min,
    end_meridian: end_meridian,
    letter_body: letter_body,
    studentdetails: studentdetails,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  oc_attendance.generateLetterIndividual();
  res.download("./LetterGenerated/Final_attendance_OC.docx"); //callback I*
});

app.post("/participantsattendance", urlencodedParser, function (req, res) {
  let designation = req.body.designation;
  let department = req.body.department;
  let subject = req.body.subject;
  let date = req.body.date;
  let respects = req.body.respects;
  let team_name = req.body.team_name;
  let event_name = req.body.event_name;
  let fromdate = req.body.fromdate;
  let todate = req.body.todate;
  let start_hour = req.body.start_hour;
  let start_min = req.body.start_min;
  let start_meridian = req.body.start_meridian;
  let end_hour = req.body.end_hour;
  let end_min = req.body.end_min;
  let end_meridian = req.body.end_meridian;
  let letter_body = req.body.letter_body;
  let studentdetails = req.body.studentdetails;

  console.log(req.body);
  let details = {
    designation: designation,
    department: department,
    subject: subject,
    date: date,
    respects: respects,
    team_name: team_name,
    event_name: event_name,
    fromdate: fromdate,
    todate: todate,
    start_hour: start_hour,
    start_min: start_min,
    start_meridian: start_meridian,
    end_hour: end_hour,
    end_min: end_min,
    end_meridian: end_meridian,
    letter_body: letter_body,
    studentdetails: studentdetails,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  participantsattendance.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_ATTENDANCE_PARTICIPANTS.docx"); //callback I*
});

app.post("/conductevent", urlencodedParser, function (req, res) {
  let subject = req.body.subject;
  let date = req.body.date;
  let respects = req.body.respects;
  let team_name = req.body.team_name;
  let event_name = req.body.event_name;
  let hall_name = req.body.hall_name;
  let fromdate = req.body.fromdate;
  let todate = req.body.todate;
  let start_hour = req.body.start_hour;
  let start_min = req.body.start_min;
  let start_meridian = req.body.start_meridian;
  let end_hour = req.body.end_hour;
  let end_min = req.body.end_min;
  let end_meridian = req.body.end_meridian;
  let letter_body = req.body.letter_body;

  console.log(req.body);
  let details = {
    subject: subject,
    date: date,
    respects: respects,
    team_name: team_name,
    event_name: event_name,
    hall_name: hall_name,
    fromdate: fromdate,
    todate: todate,
    start_hour: start_hour,
    start_min: start_min,
    start_meridian: start_meridian,
    end_hour: end_hour,
    end_min: end_min,
    end_meridian: end_meridian,
    letter_body: letter_body,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  conductevent.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_CONDUCT_EVENT.docx"); //callback I*
});

app.post("/usehall", urlencodedParser, function (req, res) {
  let subject = req.body.subject;
  let date = req.body.date;
  let respects = req.body.respects;
  let team_name = req.body.team_name;
  let event_name = req.body.event_name;
  let reason = req.body.reason;
  let hall_name = req.body.hall_name;
  let fromdate = req.body.fromdate;
  let todate = req.body.todate;
  let start_hour = req.body.start_hour;
  let start_min = req.body.start_min;
  let start_meridian = req.body.start_meridian;
  let end_hour = req.body.end_hour;
  let end_min = req.body.end_min;
  let end_meridian = req.body.end_meridian;
  let letter_body = req.body.letter_body;

  console.log(req.body);
  let details = {
    subject: subject,
    date: date,
    respects: respects,
    team_name: team_name,
    event_name: event_name,
    reason: reason,
    hall_name: hall_name,
    fromdate: fromdate,
    todate: todate,
    start_hour: start_hour,
    start_min: start_min,
    start_meridian: start_meridian,
    end_hour: end_hour,
    end_min: end_min,
    end_meridian: end_meridian,
    letter_body: letter_body,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  usehall.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_HALL_UTILIZATION_PERMISSION.docx"); //callback I*
});

app.post("/campaigning", urlencodedParser, function (req, res) {
  let designation = req.body.designation;
  let department = req.body.department;
  let subject = req.body.subject;
  let date = req.body.date;
  let respects = req.body.respects;
  let team_name = req.body.team_name;
  let event_name = req.body.event_name;
  let fromdate = req.body.fromdate;
  let todate = req.body.todate;
  let start_hour = req.body.start_hour;
  let start_min = req.body.start_min;
  let start_meridian = req.body.start_meridian;
  let end_hour = req.body.end_hour;
  let end_min = req.body.end_min;
  let end_meridian = req.body.end_meridian;
  let letter_body = req.body.letter_body;
  let where = req.body.where;
  let studentdetails = req.body.studentdetails;

  console.log(req.body);
  let details = {
    designation: designation,
    department: department,
    subject: subject,
    date: date,
    respects: respects,
    team_name: team_name,
    event_name: event_name,
    fromdate: fromdate,
    todate: todate,
    start_hour: start_hour,
    start_min: start_min,
    start_meridian: start_meridian,
    end_hour: end_hour,
    end_min: end_min,
    end_meridian: end_meridian,
    letter_body: letter_body,
    where: where,
    studentdetails: studentdetails,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  campaigning.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_CAMPAIGNING.docx"); //callback I*
});

//NEXT LETTER
/*app.post('/conductmeet' ,  urlencodedParser,function(req,res){
  let designation = req.body.designation;
  let department = req.body.department;
  let subject = req.body.subject;
  let date = req.body.date;
  let respects = req.body.respects;
  let team_name = req.body.team_name;
  let event_name = req.body.event_name;
  let fromdate = req.body.fromdate;
  let hall_name = req.body.hall_name;
  let start_hour=req.body.start_hour;
  let start_min=req.body.start_min;
  let start_meridian=req.body.start_meridian;
  let end_hour=req.body.end_hour;
  let end_min=req.body.end_min;
  let end_meridian=req.body.end_meridian;
  let time_start = req.body.time_start;
  let time_end = req.body.time_end;
  let letter_body = req.body.letter_body;
  console.log(req.body);
  let details = {
              designation:designation,
              department: department,
              subject: subject,
              date: date,
              respects: respects,
              team_name: team_name,
              event_name: event_name,
              fromdate: fromdate,
              hall_name:hall_name,
              start_hour:start_hour,
              start_min:start_min,
             start_meridian:start_meridian,
             end_hour:end_hour,
              end_min:end_min,
              end_meridian:end_meridian,
              letter_body: letter_body
            }
            let data = JSON.stringify(details, null ,2);
           fs.writeFileSync('./details.json', data);
conductmeet.generateLetterIndividual();
res.download('./LetterGenerated/FINAL_CONDUCT_MEET_PERMISSION.docx'); //callback I*
});*/

//Get user type using Access Token.

app.post("/getUserType", (req, res) => {
  try {
    users.fetchAccessToken(req, (error, token) => {
      console.log(req.headers);
      if (error) {
        console.log(error);
        return res.status(400).json({ err: "No token found!" });
      }
      users.authenticateToken(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, username) => {
          if (error) {
            console.log(error);
            return res.status(400).json({ err: error });
          }
          var fileData = fs.readFileSync("validkeys.json");
          fileData = fileData.toString();
          fileData = JSON.parse(fileData);
          if (!fileData.hasOwnProperty(username.toUpperCase())) {
            return res.status(400).json({ err: "User isnt Logged in!" });
          }
          const { userType } = fileData[username.toUpperCase()];
          return res.send({ userType: userType });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
    console.log(error);
  }
});

//---------ROUTES FOR USER CREDENTIALS UPDATE---------//

app.post("/changeForumUsername", (req, res) => {
  try {
    users.fetchAccessToken(req, (error, token) => {
      if (error) return res.status(400).json({ err: error });
      users.authenticateToken(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, username) => {
          if (error) return res.status(400).json({ err: error.message });

          if (!req.body.newUsername)
            return res.status(400).json({ err: "No newUsername specified!" });

          users.changeForumUsername(
            username,
            req.body.newUsername,
            (error, state) => {
              if (error) return res.status(500).json({ err: error });
              else return res.json({ message: "UPDATE SUCCESSFUL" });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal Server Error: changeForumUsername" });
  }
});
app.post("/changeFacultyUsername", (req, res) => {
  try {
    users.fetchAccessToken(req, (error, token) => {
      if (error) return res.status(400).json({ err: error });
      users.authenticateToken(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, username) => {
          if (error) return res.status(400).json({ err: error.message });

          if (!req.body.newUsername)
            return res.status(400).json({ err: "No newUsername specified!" });

          users.changeFacultyUsername(
            username,
            req.body.newUsername,
            (error, state) => {
              if (error) return res.status(500).json({ err: error });
              else return res.json({ message: "UPDATE SUCCESSFUL" });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "Internal Server Error: changeFacultyUsername" });
  }
});
app.post("/changeForumPassword", (req, res) => {
  try {
    users.fetchAccessToken(req, (error, token) => {
      if (error) return res.status(400).json({ err: error });
      users.authenticateToken(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, username) => {
          if (error) return res.status(400).json({ err: error.message });

          if (!req.body.oldPassword || !req.body.newPassword)
            return res
              .status(400)
              .json({ err: "not found oldPassword or newPassword" });

          users.changeForumPassword(
            username,
            req.body.oldPassword,
            req.body.newPassword,
            (error, state) => {
              if (error) return res.status(500).json({ err: error });
              else return res.json({ message: "UPDATE SUCCESSFUL" });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Internal Server Error: changeForumPassword" });
  }
});
app.post("/changeFacultyPassword", (req, res) => {
  try {
    users.fetchAccessToken(req, (error, token) => {
      if (error) return res.status(400).json({ err: error });
      users.authenticateToken(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, username) => {
          if (error) return res.status(400).json({ err: error.message });

          if (!req.body.oldPassword || !req.body.newPassword)
            return res
              .status(400)
              .json({ err: "not found oldPassword or newPassword" });

          users.changeFacultyPassword(
            username,
            req.body.oldPassword,
            req.body.newPassword,
            (error, state) => {
              if (error) return res.status(500).json({ err: error });
              else return res.json({ message: "UPDATE SUCCESSFUL" });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Internal Server Error: changeFacultyPassword" });
  }
});
app.post("/changeForumEmail", (req, res) => {
  try {
    users.fetchAccessToken(req, (error, token) => {
      if (error) return res.status(400).json({ err: error });
      users.authenticateToken(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, username) => {
          if (error) return res.status(400).json({ err: error.message });

          if (!req.body.newEmail)
            return res.status(400).json({ err: "not found newEmail" });

          users.changeForumEmail(
            username,
            req.body.newEmail,
            (error, state) => {
              if (error) return res.status(500).json({ err: error });
              else return res.json({ message: "UPDATE SUCCESSFUL" });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Internal Server Error: changeForumEmail" });
  }
});
app.post("/changeFacultyEmail", (req, res) => {
  try {
    users.fetchAccessToken(req, (error, token) => {
      if (error) return res.status(400).json({ err: error });
      users.authenticateToken(
        token,
        process.env.SECRET_ACCESS_TOKEN,
        (error, username) => {
          if (error) return res.status(400).json({ err: error.message });

          if (!req.body.newEmail)
            return res.status(400).json({ err: "not found newEmail" });

          users.changeFacultyEmail(
            username,
            req.body.newEmail,
            (error, state) => {
              if (error) return res.status(500).json({ err: error });
              else return res.json({ message: "UPDATE SUCCESSFUL" });
            }
          );
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: "Internal Server Error: changeFacultyEmail" });
  }
});
//-----------------------------------------------------------------------------------------------------------------------------------------//

//start the server.
app.listen(port_number, () => {
  console.log("server up and running on port:" + String(port_number));
});
