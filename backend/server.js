// PENDING TASKS ARE MARKED WITH A '>>>>>>' SIGN.

require("dotenv").config();
const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const users = require("./node/users.js");
const fs = require("fs");
const port_number = process.env.PORT || 8080; //PORT SPECIFIED IN THE .env file
const app = express();

//express configuration
app.use(express.static(path.join(__dirname, "/public")));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

//HOME
app.get("/", (req, res) => {
  // GO TO HOME PAGE/ LOGIN PAGE >>>>>>>>>
});

//LOGIN VERIFICATION

app.post("/login", (req, res) => {
  // checking password.

  console.log(req.body);

  //Authenticate user. >>>>>>

  // //If login OK, Send access token.
  // //create access token.
  const accessToken = users
    .generateAccessToken(
      req.body.user.username,
      process.env.SECRET_ACCESS_TOKEN
    )
    .then((ac) => res.send({ accessToken: ac }))
    .catch((err) => console.log(err)); //no expiration time;
  //send the access token.
  // now store access token in validkeys.json
  const obj = fs.readFile("validkeys.json", (err, data) => {
    if (data.toString() === "undefined") {
      const obj = {};
      obj[req.body.user.username] = accessToken;
      return;
    }
    console.log(data.toString());
    data = JSON.parse(data.toString());
    data[req.body.user.username] = accessToken; //save access token with the username
  });
  //save the data.
  fs.writeFile("validkeys.json", JSON.stringify(obj), (err) => {
    console.log(err);
    //redirect to login >>>>>
  });
});

//LOGOUT

app.post("/logout", (req, res) => {
  //Extract access token from request and verify. >>>>>>
  console.log(req.body);

  //if OK, remove the token from validkeys.json and redirect to login page.
  const obj = fs.readFile("validkeys.json", (err, data) => {
    data = JSON.parse(data.toString());

    if (data.hasOwnProperty(req.body.user.username)) {
      delete data[req.body.user.username];
    } else res.sendStatus(401); //UNAUTHORIZED. Can't logout without login.
  });
  //save the file.
  fs.writeFile("validkeys.json", JSON.stringify(obj), (err) => {
    console.log(err);
  });
});

//DASHBOARD

app.get("/dashboard", users.authenticateToken, (req, res) => {
  //users.authenticateToken is the middleware.

  //token verification done by middleware.
  console.log(req.body);

  //token OK
  //redirect to dashboard of req.user . >>>>>>>>

  res.json({ msg: "login success!" }); //TEST MESSAGE.
});

//REGISTRATION STATUS CHECK

app.post("/checkRegistrationStatus", (req, res) => {
  //check user registered or not. >>>>>>>

  console.log(req.body);
  res.send({ msg: "checking registration status" }); //TEST MESSAGE.
});

//REGISTER FORUM

app.post("/registerForum", (req, res) => {
  // register a forum. >>>>>>>

  console.log(req.body);
  res.send({ msg: "registered user." }); // TEST MESSAGE
});

//start the server.
app.listen(port_number, () => {
  console.log("server up and running on port:" + String(port_number));
});
