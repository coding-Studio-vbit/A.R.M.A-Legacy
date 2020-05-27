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
var conductmeet = require("./conductmeet");
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

app.get("/getForumDetails",(req,res)=>{
		users.fetchAccessToken(req)
		.then((token)=>users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN))
		.then(()=>{
				var client = new Client()
				client.connect();
				client.query('SELECT actual_name,email,phone_no FROM forums WHERE forum_name=$1',[username])
				.then((data)=>{
          			if(data.rows.length===0){
    				return res.json({
  						actual_name: " ",
  						email: " ",
  						phone_no: " "
  					});
    			}
				res.json({
						actual_name: data.rows[0].actual_name,
						email: data.rows[0].email,
						phone_no: data.rows[0].phone_no
				})}) // successful data retrieval.
				.catch(err=>{console.log(err);return res.status(500).json({err:"Internal Database Error"})})
		})
		.catch(error=>{
			console.log(error);
			return res.status(400).json({err:error});
		})
});

app.post("/login", (req, res) => {

  if(!req.body.user || !req.body.user.username || !req.body.user.password) return res.status(400).json({err:"Invalid number of fields"});

  users.checkForumPassword(req.body.user.username,req.body.user.password)
  .then((state)=>{
  		if(state)
		{
            users.generateAccessToken(
              req.body.user.username.toUpperCase(),
              process.env.SECRET_ACCESS_TOKEN
            ).then((token)=>{

				res.send({message: "USERNAME: "+req.body.user.username.toUpperCase(),accessToken:token})
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
			.catch(err=>{
				console.log(err);
				return res.status(500).json({err:"Couldnt generate AccessToken"});
			})
		}
		else
		{
			 return res.json({err:"Invalid Password"});	
		}
  })
  .catch((error)=>{
  	return res.status(400).json({err: error})
  })
});

//Faculty Login

app.post("/loginFaculty", (req, res) => {
  if(!req.body.user || !req.body.user.username || !req.body.user.password) return res.status(400).json({err:"Invalid number of fields"});

  users.checkFacultyPassword(req.body.user.username,req.body.user.password)
  .then((state)=>{
  		if(state)
		{
			users.generateAccessToken(req.body.user.username.toUpperCase(),process.env.SECRET_ACCESS_TOKEN)
			.then((token)=>{
            		res.send({
            		  message: "USERNAME: " + req.body.user.username.toUpperCase(),
            		  accessToken: token
            		});
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
			.catch(error=>{
				console.log(error);
				return res.status(500).json({err:"Couldnt generate Access token!"});
			})
		}	
		else
		{
			return res.json({err: "Invalid Password"});
		}
  })
  .catch(error=>{
  	return res.status(400).json({err:error});
  })
});

//LOGOUT
// logout is same for both faculty and forums.

app.post("/logout", (req, res) => {
  //if check token, remove the token from validkeys.json and redirect to login page.
  //For logout the request should have both the username and the access token.
	users.fetchAccessToken(req)
	.then((token)=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then((username)=>{
    	  var obj = fs.readFileSync("validkeys.json");
    	  obj = JSON.parse(obj.toString());
    	  if (obj.hasOwnProperty(username)) {
    	    delete obj[username.toUpperCase()];
    	  }
		  else
    	    return res.status(401).send({ err: "CANNOT LOGOUT WITHOUT LOGIN!" }); //UNAUTHORIZED. Can't logout without login.
    	  res.send({ message: "LOGOUT SUCCESSFUL!" });
    	  fs.writeFileSync("validkeys.json", JSON.stringify(obj));
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});

//FACULTY DASHBOARD
//change to get
app.get("/facultydashboard", (req, res) => {
	users.fetchAccessToken(req)
	.then((token)=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN)
	})
	.then((faculty_roll)=>{
          faculty_roll = faculty_roll.toUpperCase();
          var client = new Client();
          client.connect();
          client.query(
              "select request_id,forum_name,remarks,status, request_data->'subject' as subject from requests where request_id in (select request_id from recipients where faculty_roll=$1)",
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
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});

app.post("/createrequest", (req, res) => {

	if(!req.body.recipients || !req.body.request_data) return res.status(400).json({err:"Invalid Number of fields"});

	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then((username)=>{
		
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
            client.query("select faculty_roll from faculty where faculty_name=$1",[req.body.recipients[i]])
			.then((data) => {
                if (data.rows.length != 0)
                  recipients.push(data.rows[0].faculty_roll);
              })
			.catch(error=>{
			 	console.log(error);
				return res.status(500).json({err:"Internal database error!"});
			 })
          }
          requestQueries.addRequest(forum_name, unique_id,req.body.request_data,   recipients, (error, status) => {
              if (error) {
                console.log(error);
                return res.status(500).json({ err: "Internal Server Error(database)" });
              }
            }
          );
       return res.send({ message: "request sent succesfully!" });
	})
	.catch(error=>{
		return res.status(400).json({err:error})
	})
});

app.delete("/createrequest", (req, res) => {

	if(!req.body.request_id) return res.status(400).json({err:"Invalid number of fields!"});

	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
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
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});


//<<<<<<<<<<<<<<<< INSECURE >>>>>>>>>>>>>>>>>
app.put("/createrequest", (req, res) => {

users.fetchAccessToken(req)
.then(token=>{
	return users.authenticateToken(token,process.env.SECRET_ACCESS_TOKEN);
})
.then(username=>{
          requestQueries.changeRequest(req.body.forum_name, req.body.request_data, req.body.status, req.body.remarks, req.body.request_id,  (error,status)=> {console.log(error,status); if(error){throw {err:error}}})
          return res.send({message: "Updated succesfully!"})
})
.catch(error=>{
	return res.status(400).json({err: error});
})
});



app.post("/approverequest", (req,res) => {

if(!req.body.request_id || !req.body.status) return res.status(400).json({err: "Invalid number of arguments!"});

	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
    	    var data = fs.readFileSync("validkeys.json");
    	    data = data.toString();
    	    data = JSON.parse(data);
		    if(data.hasOwnProperty(username) && data[username].userType == 'FACULTY') //only faculty can approve or reject.
		    {

  		      var client = new Client();
  		      client.connect();
  		      client.query('update requests set status = $1 where request_id=$2 AND request_id IN (select request_id from recipients where faculty_roll=$3)',[req.body.status, req.body.request_id,username])
			  .then((data)=>{
  		          if(data.rowCount === 0){
  		            return res.status(400).json({ err: "No such rows found" });
  		          }
  		          client.end();
  		          return res.send({message: "approved", msg: data})
  		      })
			  .catch(error=>{console.log(error);return res.status(500).json({err:"Internal Database Error"})})
		    }
		    else{
		    	return res.status(400).json({err:'Bad request, nice try.'});
		    }
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});

app.get("/forumdashboard", async (req, res) => {
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(forum_name=>{
          forum_name = forum_name.toUpperCase();
          var client = new Client();
          client.connect();
          client
            .query(
              "select request_id,remarks,status, request_data->'subject' as subject from requests where forum_name=$1",
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
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});

app.get("/getrequest", async (req, res) => {

  if(!req.query || !req.query.request_id) return res.status(400).json({err:"Invalid number of fields"});
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
          var client = new Client();
          client.connect();
          client
            .query(
              "select * from requests where request_id=$1",
              [req.query.request_id]
            )
            .then((data) => {
              if(data.rowCount === 0){
                client.end();
                return res.json({ err: "No such rows found" });
              }
              res.json(data.rows);
              console.log(data);
              client.end();
            })
            .catch((err) => {
              console.log(err);
              client.end();
            });
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
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
  const remark = req;
  console.log(remark);
});

app.post("/checkRegistrationStatus", (req, res) => {

	 if(!req.body.query || !req.body.query.username) return res.status(400).json({err:"No query or username property specified!"});

      users.checkRegistrationStatus(req.body.query.username.toUpperCase())
	  .then((state) => {
         return res.json({ message: state });
      })
	  .catch(error=>{
	  	console.log(error);
		return res.status(500).json({err:"Internal Server Error"});
	  })
});
//REGISTRATION STATUS CHECK FOR FACULTY
app.post("/checkFacultyRegistrationStatus", (req, res) => {
	 if(!req.body.query || !req.body.query.username) return res.status(400).json({err:"No query or username property specified!"});

      users.checkFacultyRegistrationStatus(req.body.query.username.toUpperCase())
	  .then((state) => {
         return res.json({ message: state });
      })
	  .catch(error=>{
	  	console.log(error);
		return res.status(500).json({err:"Internal Server Error"});
	  })
});

//REGISTER FORUM REQUEST

app.post("/registerForum", (req, res) => {


	const data = req.body.registrationData;
	if(!data) return res.status(400).json({err: "No registrationData field found!"});
	if(!data.username || !data.phone || !data.email) return res.status(400).json({err: "Invalid number of arguments"});

	dataValidator.validateRegistrationData(data)
	.then(ok=>{
		return users.checkRegistrationStatus(data.username)
	})
	.then(state=>{
		if(state) return res.json({message:"User has already registered"});
		else
			{
				res.json({message: "Response recorded"});
				mailSender.sendMail("Registration Notification",
				"Your request has been recorded. You will be contacted shortly :)",
				data.email)
				.then(()=>{
					//nothing. Mail is sent to forum.
				})
				.catch(error=>{
					console.log("Error sending mail to user :"+data.email, error);
				})
				.then(()=>{
					return mailSender.sendMail("Registration Request",JSON.stringify(data),process.env.USERMAIL);
				})
				.then(()=>{
					//nothing. We get the mail.
				})
				.catch(error=>{
					console.log("Error sending mail to self",error);
				})
				.then(()=>{
					return users.newForumRegistrationRequest(
						data.username,
						data.phone,
						data.email
					)
				})
				.then(ok=>{
					console.log("NEW REGISTRATION REQUEST RECEIVED!");
				}).catch(error=>{
					console.log("error inserting new forum registration data!", error);
				})
			}
	}).catch(error=>{
		res.status(400).json({err:error});
	})
});

//REGISTER FACULTY REQUEST
app.post("/registerFaculty", (req, res) => {
	
	const data = req.body.registrationData;
	if(!data) return res.status(400).json({err: "No registrationData field found!"});
	if(!data.faculty_name || !data.faculty_phone || !data.faculty_email || !data.faculty_dept || !data.faculty_roll) return res.status(400).json({err: "Invalid number of arguments"});
	dataValidator.validateFacultyRegistrationData(data)
	.then(ok=>{
		return users.checkFacultyRegistrationStatus(data.faculty_roll)
	})
	.then(state=>{
		if(state) return res.json({message:"User has already registered"});
		else
			{
				res.json({message: "Response recorded"});
				mailSender.sendMail("Registration Notification",
				"Your request has been recorded. You will be contacted shortly :)",
				data.faculty_email)
				.then(()=>{
					//nothing. Mail is sent to faculty.
				})
				.catch(error=>{
					console.log("Error sending mail to user :"+data.faculty_email, error);
				})
				.then(()=>{
					return mailSender.sendMail("Registration Request",JSON.stringify(data),process.env.USERMAIL);
				})
				.then(()=>{
					//nothing. We get the mail.
				})
				.catch(error=>{
					console.log("Error sending mail to self",error);
				})
				.then(()=>{
					return users.newFacultyRegistrationRequest(
					data.faculty_name,
					data.faculty_dept,
					data.faculty_roll.toUpperCase(),
					data.faculty_email,
					data.faculty_phone
					)
				})
				.then(ok=>{
					console.log("NEW REGISTRATION REQUEST RECEIVED!");
				}).catch(error=>{
					console.log("error inserting new faculty registration data!", error);
				})
			}
	}).catch(error=>{
		res.status(400).json({err:error});
	})

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
app.post('/conductmeet' ,  urlencodedParser,function(req,res){
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
  let studentdetails = req.body.studentdetails;

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
              letter_body: letter_body,
              studentdetails: studentdetails,
            }
            let data = JSON.stringify(details, null ,2);
           fs.writeFileSync('./details.json', data);
conductmeet.generateLetterIndividual();
res.download('./LetterGenerated/conductmeet.docx'); //callback I*
});

//Get user type using Access Token.

app.post("/getUserType", (req, res) => {
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
		
	       var fileData = fs.readFileSync("validkeys.json");
	       fileData = fileData.toString();
	       fileData = JSON.parse(fileData);
	       if (!fileData.hasOwnProperty(username.toUpperCase())) {
	         return res.status(400).json({ err: "User isnt Logged in!" });
	       }
	       const { userType } = fileData[username.toUpperCase()];
	       return res.send({ userType: userType });
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});

//---------ROUTES FOR USER CREDENTIALS UPDATE---------//

app.post("/changeForumUsername", (req, res) => {
	
	if(!req.body.newUsername)return res.status(400).json({err:"Invalid number of arguments!"})

	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
          if (!req.body.newUsername)
            return res.status(400).json({ err: "No newUsername specified!" });
          return users.changeForumUsername(username, req.body.newUsername);
	})
	.then((ok)=>{
        return res.json({ message: "UPDATE SUCCESSFUL" });
	})
	.catch(error=>{
		console.log("changeForumUsername error!", error);
		return res.status(400).json({err:error});
	})
});

app.post("/changeFacultyUsername", (req, res) => {

	if(!req.body.newUsername)return res.status(400).json({err:"Invalid number of arguments!"})
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
          if (!req.body.newUsername)
            return res.status(400).json({ err: "No newUsername specified!" });
       return  users.changeFacultyUsername(username, req.body.newUsername)
	})
	.then((ok)=>{
         return res.json({ message: "UPDATE SUCCESSFUL" });
	})
	.catch(error=>{
		console.log("changeFacultyUSername error!", error);
		return res.status(400).json({err:error});
	})
});

app.post("/changeForumPassword", (req, res) => {
	if(!req.body.newPassword || !req.body.oldPassword)return res.status(400).json({err:"Invalid number of arguments!"})
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
		
          if (!req.body.oldPassword || !req.body.newPassword)
            return res
              .status(400)
              .json({ err: "not found oldPassword or newPassword" });
          return users.changeForumPassword(username,req.body.oldPassword, req.body.newPassword)
	})
	.then((ok)=>{
          return res.json({ message: "UPDATE SUCCESSFUL" });
	})
	.catch(error=>{
		console.log("changeForumPassword error!", error);
		return res.status(400).json({err:error});
	})
});
app.post("/changeFacultyPassword", (req, res) => {

	if(!req.body.newPassword || !req.body.oldPassword)return res.status(400).json({err:"Invalid number of arguments!"})
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
		
          if (!req.body.oldPassword || !req.body.newPassword)
            return res
              .status(400)
              .json({ err: "not found oldPassword or newPassword" });

          return users.changeFacultyPassword(
            username,
            req.body.oldPassword,
            req.body.newPassword)
	})
	.then(ok=>{
		return res.json({message: "UPDATE SUCCESSFUL"});
	})
	.catch(error=>{
		console.log("changeFAcultyPAssword error!", error);
		return res.status(400).json({err:error});
	})
});

app.post("/changeForumEmail", (req, res) => {

	if(!req.body.newEmail)return res.status(400).json({err:"Invalid number of arguments!"})
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
		
          if (!req.body.newEmail)
            return res.status(400).json({ err: "not found newEmail" });

          return users.changeForumEmail(
            username,
            req.body.newEmail)
	})
	.then(ok=>{
		return res.json({message:"UPDATE SUCCESSFUL"});
	})
	.catch(error=>{
		console.log("changeForumEmail error!", error);
		return res.status(400).json({err:error});
	})

});

app.post("/changeFacultyEmail", (req, res) => {
	
	if(!req.body.newEmail)return res.status(400).json({err:"Invalid number of arguments!"})
	users.fetchAccessToken(req)
	.then(token=>{
		return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
	})
	.then(username=>{
          if (!req.body.newEmail)
            return res.status(400).json({ err: "not found newEmail" });

          return users.changeFacultyEmail(
            username,
            req.body.newEmail)
	})
	.then(ok=>{
		return res.json({message: "UPDATE SUCCESSFUL"});
	})
	.catch(error=>{
		console.log("changeFacultyEmail error!", error);
		return res.status(400).json({err:error});
	})
});
//-----------------------------------------------------------------------------------------------------------------------------------------//
//start the server.
app.listen(port_number, () => {
  console.log("server up and running on port:" + String(port_number));
});
