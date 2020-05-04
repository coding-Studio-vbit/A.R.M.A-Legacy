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

app.get("/", (req, res) => {
  //any on load request to be handled here.
});

app.post("/login", (req, res) => {
<<<<<<< HEAD
  //check password >>>>>

  console.log(req.body);

  // //If login OK, Send access token.
  // //create access token.
  var access = "";

  const accessToken = users
    .generateAccessToken(
      req.body.user.username,
      process.env.SECRET_ACCESS_TOKEN
    )
    .then((ac) => {
      res.send({ accessToken: ac });
      access = ac;
    })
    .catch((err) => console.log(err)); //no expiration time;
  //send the access token.
  // now store access token in validkeys.json
  const obj = fs.readFile("validkeys.json", (err, data) => {
    if (data.toString() === "undefined") {
      const temp = {};
      temp[req.body.user.username] = accessToken;
      return temp;
    }
    console.log(data.toString());
    console.log(obj);
    data = JSON.parse(data.toString());
    data[req.body.user.username] = accessToken; //save access token with the username
    return data;
  });
  //save the data.
  fs.writeFile("validkeys.json", JSON.stringify(obj), (err) => {
    console.log(err);
    //redirect to login >>>>>
  });
=======

	//check password 
  	users.checkForumPassword(req.body.user.username,req.body.user.password,(err,status)=>{
    	if(err){
	 		 console.log(err);
     		 return res.status(401).send({message: err});
   		}

	  if(status == true)
	  {
      	const accessToken = users.generateAccessToken(req.body.user.username,process.env.SECRET_ACCESS_TOKEN);
    
      	res.send({message:'Login Successful',accessToken: accessToken});
      	console.log('token: '+accessToken);
      	
      	var obj = fs.readFileSync("./validkeys.json");
      	obj = obj.toString();
      	obj = JSON.parse(obj);
      	obj[req.body.user.username] = accessToken;

      	//save the data.
      	fs.writeFileSync("validkeys.json",JSON.stringify(obj));
	  }
	  else
	  {
	  	res.status(401).send({message: "Invalid Password"}); //password wrong, return UNAUTHORIZED.
	  }
  }).catch((error)=>{console.log(error);res.status(500).send("Internal Server Error");})
>>>>>>> 152486f35305f0d7b41593be02b964ee54442e65
});

//LOGOUT

app.post("/logout", (req, res) => {

  //if OK, remove the token from validkeys.json and redirect to login page.
  var obj = fs.readFileSync("validkeys.json");
    obj = JSON.parse(obj.toString());
    
	if (obj.hasOwnProperty(req.body.user.username)) {
      delete obj[req.body.user.username];
    } else res.status(401).send({message: "CANNOT LOGOUT WITHOUT LOGIN!"}); //UNAUTHORIZED. Can't logout without login.

   res.send({message: "LOGOUT SUCCESSFUL!"})
  //save the file.
  fs.writeFileSync("validkeys.json", JSON.stringify(obj));
});

//DASHBOARD

app.get("/dashboard", users.authenticateToken, (req, res) => {
  //users.authenticateToken is the middleware.

  //token verification done by middleware.
  console.log(req.body);

  //token OK

  res.json({ message: "LOGIN SUCCESS" });
});

//REGISTRATION STATUS CHECK

app.post("/checkRegistrationStatus", (req, res) => {
  //check user registered or not. >>>>>>>

  console.log(req.body);
  res.send({ message: "REGISTRATION STATUS IS" }); //TEST MESSAGE.
});

//REGISTER FORUM

app.post("/registerForum", (req, res) => {
  // register a forum. >>>>>>>

  console.log(req.body);
  res.send({ message: "USER REGISTERED" }); // TEST MESSAGE
});

//start the server.
app.listen(port_number, () => {
  console.log("server up and running on port:" + String(port_number));
});
