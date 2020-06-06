require("dotenv").config();
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const users = require("./node/users.js");
const dataValidator = require("./node/dataValidator.js");
const serverHelper = require("./ServerHelper");
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
var teamattendance = require("./teamattendance");
var campaigning = require("./campaigning");
var participantsattendance = require("./participantsattendance");
var conductevent = require("./conductevent");
var eventvenue = require("./eventvenue");
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

app.get("/getForumDetails",async (req, res) => {	

	await serverHelper.getForumDetails(req).then((response)=>{
		res.status(response.status).json(response.response)
	}).catch(err=>res.status(400).json({err:err}));
});
app.get("/getFacultyDetails", (req,res)=>{
	serverHelper.getFacultyDetails(req)
	.then(response=>{
		res.status(response.status).json(response.response);
	})
	.catch(error=>{
		res.status(400).json({err:error});
	})
})
app.get("/getRegisteredForums",(req,res)=>{
	serverHelper.getRegisteredForums(req)
	.then(response=>{return res.status(response.status).json(response.response);})
	.catch(error=>{return res.status(400).json({err:error})})
})

app.get("/getFaculty",(req,res)=>{
	serverHelper.getFaculty(req).then(response=>{
		return res.status(response.status).json(response.response);
	}).catch(error=>{return res.status(response.status).json(response.response)})
});

app.get("/getFacilities",(req,res)=>{
	serverHelper.getFacilities(req).then(response=>{
		return res.status(response.status).json(response.response);
	}).catch(error=>{return res.status(response.status).json(response.response)})
});

app.post("/login", async (req, res) => {
  serverHelper
    .loginForums(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => {
      return res.status(400).json({ err: error });
    });
});

//Faculty Login

app.post("/loginFaculty", (req, res) => {
  serverHelper
    .loginFaculty(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

//LOGOUT
app.post("/logout", (req, res) => {
  serverHelper
    .logout(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});
//FORGOT PASSWORD

app.post("/forgotPassword", (req, res) => {
  serverHelper
    .forgotPassword(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => {
      return res.status(400).json({ err: error });
    });
});

app.get("/facultydashboard", (req, res) => {
  serverHelper
    .facultyDashboard(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.post("/createrequest", (req, res) => {
  serverHelper
    .makeNewRequest(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.delete("/createrequest", (req, res) => {
  serverHelper
    .deleteRequest(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

//<<<<<<<<<<<<<<<< INSECURE >>>>>>>>>>>>>>>>>
app.put("/createrequest", (req, res) => {
  serverHelper
    .updateRequest(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.post("/approverequest", (req, res) => {
  serverHelper
    .approveRequest(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.get("/forumdashboard", async (req, res) => {
  serverHelper
    .forumsDashboard(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.get("/getrequest", async (req, res) => {
  serverHelper
    .fetchRequest(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

//REGISTRATION STATUS CHECK

//Remarks
app.post("/Remarks", (req, res) => {
  const remark = req;
  console.log(remark);
});

app.post("/checkRegistrationStatus", (req, res) => {
  serverHelper
    .checkForumRegistrationStatus(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});
//REGISTRATION STATUS CHECK FOR FACULTY
app.post("/checkFacultyRegistrationStatus", (req, res) => {
  serverHelper
    .checkFacultyRegistrationStatus(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

//REGISTER FORUM REQUEST

app.post("/registerForum", (req, res) => {
  serverHelper
    .registerForum(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

//REGISTER FACULTY REQUEST
app.post("/registerFaculty", (req, res) => {
  serverHelper
    .registerFaculty(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

//Letter

app.post("/teamattendance", urlencodedParser, function (req, res) {
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
  teamattendance.generateLetterIndividual();
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

app.post("/eventvenue", urlencodedParser, function (req, res) {
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
  eventvenue.generateLetterIndividual();
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
app.post("/conductmeet", urlencodedParser, function (req, res) {
  let designation = req.body.designation;
  let department = req.body.department;
  let subject = req.body.subject;
  let date = req.body.date;
  let respects = req.body.respects;
  let team_name = req.body.team_name;
  let event_name = req.body.event_name;
  let fromdate = req.body.fromdate;
  let hall_name = req.body.hall_name;
  let start_hour = req.body.start_hour;
  let start_min = req.body.start_min;
  let start_meridian = req.body.start_meridian;
  let end_hour = req.body.end_hour;
  let end_min = req.body.end_min;
  let end_meridian = req.body.end_meridian;
  let time_start = req.body.time_start;
  let time_end = req.body.time_end;
  let letter_body = req.body.letter_body;
  let studentdetails = req.body.studentdetails;

  let details = {
    designation: designation,
    department: department,
    subject: subject,
    date: date,
    respects: respects,
    team_name: team_name,
    event_name: event_name,
    fromdate: fromdate,
    hall_name: hall_name,
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
  conductmeet.generateLetterIndividual();
  res.download("./LetterGenerated/conductmeet.docx"); //callback I*
});

//Get user type using Access Token.

app.post("/getUserType", (req, res) => {
  serverHelper
    .getUserType(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

//---------ROUTES FOR USER CREDENTIALS UPDATE---------//

app.post("/changeForumUsername", (req, res) => {
  serverHelper
    .changeForumUsername(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.post("/changeFacultyUsername", (req, res) => {
  serverHelper
    .changeFacultyUsername(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.post("/changeForumPassword", (req, res) => {
  serverHelper
    .changeForumPassword(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});
app.post("/changeFacultyPassword", (req, res) => {
  serverHelper
    .changeFacultyPassword(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.post("/changeForumEmail", (req, res) => {
  serverHelper
    .changeForumEmail(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

app.post("/changeFacultyEmail", (req, res) => {
  serverHelper
    .changeFacultyEmail(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});
//-----------------------------------------------------------------------------------------------------------------------------------------//
//start the server.
app.listen(port_number, () => {
  console.log("server up and running on port:" + String(port_number));
});
