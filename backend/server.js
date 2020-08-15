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
const multer = require("multer");
const templateHelper = require("./personalTemplates/TemplateHelper.js");
const admin = require('./Admin.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./personalTemplates/allTemplates");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

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
//student letters
var halfdayleave = require("./halfdayleave");
var leaveletter = require("./leaveletter");
var aknowledgeabsence = require("./aknowledgeabsence");
var latefee = require("./latefee");
var periodabsent = require("./periodabsent");
var laterecordsub = require("./laterecordsub");
var latetoclass = require("./latetoclass");
var allowtolabexam = require("./allowtolabexam");
var hostelleave = require("./hostelleave");
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

app.get("/getForumDetails", async (req, res) => {
  await serverHelper
    .getForumDetails(req)
    .then((response) => {
      res.status(response.status).json(response.response);
    })
    .catch((err) => res.status(400).json({ err: err }));
});
app.get("/getFacultyDetails", (req, res) => {
  serverHelper
    .getFacultyDetails(req)
    .then((response) => {
      res.status(response.status).json(response.response);
    })
    .catch((error) => {
      res.status(400).json({ err: error });
    });
});
app.get("/getRegisteredForums", (req, res) => {
  serverHelper
    .getRegisteredForums(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => {
      return res.status(400).json({ err: error });
    });
});

app.get("/getFaculty", (req, res) => {
  serverHelper
    .getFaculty(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => {
      return res.status(response.status).json(response.response);
    });
});

app.get("/getFacilities", (req, res) => {
  serverHelper
    .getFacilities(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => {
      return res.status(response.status).json(response.response);
    });
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
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  serverHelper
    .deleteRequest(req)
    .then((response) => {
      return res.status(response.status).json(response.response);
    })
    .catch((error) => res.status(400).json({ err: error }));
});

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
    .catch((error) => res.status(200).json({ err: error }));
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
  let details = {
    designation: req.body.designation,
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    team_name: req.body.team_name,
    event_name: req.body.event_name,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    start_hour: req.body.start_hour,
    start_min: req.body.start_min,
    start_meridian: req.body.start_meridian,
    end_hour: req.body.end_hour,
    end_min: req.body.end_min,
    end_meridian: req.body.end_meridian,
    letter_body: req.body.letter_body,
    studentdetails: req.body.studentdetails,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  teamattendance.generateLetterIndividual();
  res.download("./LetterGenerated/Final_attendance_OC.docx"); //callback I*
});

app.post("/participantsattendance", urlencodedParser, function (req, res) {
  let details = {
    designation: req.body.designation,
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    team_name: req.body.team_name,
    event_name: req.body.event_name,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    start_hour: req.body.start_hour,
    start_min: req.body.start_min,
    start_meridian: req.body.start_min,
    end_hour: req.body.end_hour,
    end_min: req.body.end_min,
    end_meridian: req.body.end_meridian,
    letter_body: req.body.letter_body,
    studentdetails: req.body.studentdetails,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  participantsattendance.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_ATTENDANCE_PARTICIPANTS.docx"); //callback I*
});

app.post("/conductevent", urlencodedParser, function (req, res) {
  let details = {
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    team_name: req.body.team_name,
    event_name: req.body.event_name,
    hall_name: req.body.hall_name,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    start_hour: req.body.start_hour,
    start_min: req.body.start_min,
    start_meridian: req.body.start_meridian,
    end_hour: req.body.end_hour,
    end_min: req.body.end_min,
    end_meridian: req.body.end_meridian,
    letter_body: req.body.letter_body,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  conductevent.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_CONDUCT_EVENT.docx"); //callback I*
});

app.post("/eventvenue", urlencodedParser, function (req, res) {
  let details = {
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    team_name: req.body.team_name,
    event_name: req.body.event_name,
    reason: req.body.reason,
    hall_name: req.body.hall_name,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    start_hour: req.body.start_hour,
    start_min: req.body.start_min,
    start_meridian: req.body.start_meridian,
    end_hour: req.body.end_hour,
    end_min: req.body.end_min,
    end_meridian: req.body.end_meridian,
    letter_body: req.body.letter_body,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  eventvenue.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_HALL_UTILIZATION_PERMISSION.docx"); //callback I*
});

app.post("/campaigning", urlencodedParser, function (req, res) {
  let details = {
    designation: req.body.designation,
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    team_name: req.body.team_name,
    event_name: req.body.event_name,
    fromdate: req.body.fromdate,
    todate: req.body.todate,
    start_hour: req.body.start_hour,
    start_min: req.body.start_min,
    start_meridian: req.body.start_meridian,
    end_hour: req.body.end_hour,
    end_min: req.body.end_min,
    end_meridian: req.body.end_meridian,
    letter_body: req.body.letter_body,
    where: req.body.where,
    studentdetails: req.body.studentdetails,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  campaigning.generateLetterIndividual();
  res.download("./LetterGenerated/FINAL_CAMPAIGNING.docx"); //callback I*
});

//NEXT LETTER
app.post("/conductmeet", urlencodedParser, function (req, res) {
  let details = {
    designation: req.body.designation,
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    team_name: req.body.team_name,
    event_name: req.body.event_name,
    fromdate: req.body.fromdate,
    hall_name: req.body.hall_name,
    start_hour: req.body.start_hour,
    start_min: req.body.start_min,
    start_meridian: req.body.start_meridian,
    end_hour: req.body.end_hour,
    end_min: req.body.end_min,
    end_meridian: req.body.end_meridian,
    letter_body: req.body.letter_body,
    studentdetails: req.body.studentdetails,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  conductmeet.generateLetterIndividual();
  res.download("./LetterGenerated/conductmeet.docx"); //callback I*
});
//STUDENT LETTERS
app.post("/halfdayleave", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  halfdayleave.generateLetterIndividual();
  res.download("./LetterGenerated/halfdayleave.docx"); //callback I*
});

app.post("/leaveletter", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  leaveletter.generateLetterIndividual();
  res.download("./LetterGenerated/leaveletter.docx"); //callback I*
});

app.post("/aknowledgeabsence", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  aknowledgeabsence.generateLetterIndividual();
  res.download("./LetterGenerated/aknowledgeabsence.docx"); //callback I*
});

app.post("/latefee", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  latefee.generateLetterIndividual();
  res.download("./LetterGenerated/latefee.docx"); //callback I*
});

app.post("/periodabsent", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    period: req.body.period,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  periodabsent.generateLetterIndividual();
  res.download("./LetterGenerated/periodabsent.docx"); //callback I*
});

app.post("/laterecordsub", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  laterecordsub.generateLetterIndividual();
  res.download("./LetterGenerated/laterecordsub.docx"); //callback I*
});

app.post("/latetoclass", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  latetoclass.generateLetterIndividual();
  res.download("./LetterGenerated/latetoclass.docx"); //callback I*
});

app.post("/allowtolabexam", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    exam: req.body.exam,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  allowtolabexam.generateLetterIndividual();
  res.download("./LetterGenerated/allowtolabexam.docx"); //callback I*
});

app.post("/hostelleave", urlencodedParser, function (req, res) {
  let details = {
    department: req.body.department,
    subject: req.body.subject,
    date: req.body.date,
    respects: req.body.respects,
    your_name: req.body.your_name,
    year: req.body.year,
    section: req.body.section,
    roll_no: req.body.roll_no,
    reason: req.body.reason,
    hod_name: req.body.hod_name,
    faculty_name: req.body.faculty_name,
    faculty: req.body.faculty,
  };
  let data = JSON.stringify(details, null, 2);
  fs.writeFileSync("./details.json", data);
  hostelleave.generateLetterIndividual();
  res.download("./LetterGenerated/hostelleave.docx"); //callback I*
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

app.post("/uploadTemplate", (req, res) => {
  console.log(req);
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      //YOUR ENDPOINT CODE HERE
      upload(req, res, (error) => {
        if (error instanceof multer.MulterError) {
          console.log(error);
          return res.status(500).json({ err: error });
        } else if (error) {
          console.log(error);
          return res.status(500).json({ err: error });
        }
        console.log(req.file);
        let templateName = req.file.originalname;
        templateName = templateName.slice(0, templateName.length - 5);
        console.log(templateName);
        //res.status(200).json({ message: "Template successfully uploaded" });
        templateHelper
          .insertNewTemplate(username, templateName, req.file.path)
          .then((result) => {
            return res.status(200).json({ message: result });
          })
          .catch((err) => {
            return res.status(400).json({ err: err });
          });
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ err: error });
    });
});

app.post("/getPlaceholders", (req, res) => {
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      return templateHelper.fetchTemplatePlaceHolders(
        username,
        req.body.templateName
      );
    })
    .then((response) => {
      return res.status(200).json({ placeholders: response });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ err: error });
    });
});

app.post("/generateTemplateLetter", (req, res) => {
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      if (!req.body.template_name || !req.body.form_data)
        return res.status(400).json({ err: "Invalid number of fields" });
      return templateHelper.generateTemplateLetter(
        username,
        req.body.template_name,
        req.body.form_data
      );
    })
    .then((filepath) => {
      console.log(filepath);
      res.download(filepath);
      // fs.unlink(filepath,(error)=>{
      // 	console.log("Error deleting generated letter: "+filepath, error);
      // });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ err: error });
    });
});

app.get("/getPersonalTemplateList", (req, res) => {
  users
    .fetchAccessToken(req)
    .then((token) => {
      return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
    })
    .then((username) => {
      return templateHelper.getPersonalTemplatesList(username);
    })
    .then((list) => {
      return res.json({ personalTemplateList: list });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ err: error });
    });
});
app.post('/getNewForumRegistrations', (req, res)=>{
	admin.authenticateAdmin(req)
	.then(state=>{
		return admin.getNewForumRegistrations();
	})
	.then(response=>{
		return res.status(200).json({data:response});
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});
app.post('/getNewFacultyRegistrations', (req, res)=>{
	admin.authenticateAdmin(req)
	.then(state=>{
		return admin.getNewFacultyRegistrations();
	})
	.then(response=>{
		return res.status(200).json({data:response});
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
});
app.post('/adminRegisterNewForum', (req, res)=>{
	admin.authenticateAdmin(req)
	.then(state=>{
		return admin.registerNewForum(req); 	
	})
	.then(response=>{
		return res.status(200).json({message: response});
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
})
app.post('/adminRegisterNewFaculty', (req, res)=>{
	admin.authenticateAdmin(req)
	.then(state=>{
		return admin.registerNewFaculty(req); 	
	})
	.then(response=>{
		return res.status(200).json({message: response});
	})
	.catch(error=>{
		return res.status(400).json({err:error});
	})
})

//-----------------------------------------------------------------------------------------------------------------------------------------//
//start the server.
app.listen(port_number, () => {
  console.log("server up and running on port:" + String(port_number));
});
