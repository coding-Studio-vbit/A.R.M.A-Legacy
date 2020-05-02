require('dotenv').config();
const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const users = require('node/users.js');
const fs = require('fs');
const port_number = process.env.PORT || 8080;
const app = express();


//express configuration
app.use(express.static(path.join(__dirname, "/public")));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
	res.sendFile('index.html');
});

app.post('/login',(req,res)=>{ // checking password.
	
	//Authenticate user. >>>>>>



	//If login OK, Send access token.
	const accessToken = users.generateAccessToken(req.body.user.username,process.env.SECRET_ACCESS_TOKEN) //no expiration time;
	res.send({accessToken: accessToken});
	// now store access token in validkeys.json
	const obj = fs.readFile('validkeys.json', (err,data)=>{
		data = JSON.parse(data.toString());
		data[req.body.user.username] = accessToken; //save access token with the username
	})
	//save the data.
	fs.writeFile('validkeys.json',JSON.strigify(obj),(err)=>{
		console.log(err);
		//redirect to login >>>>>
	};)
});
app.post('/logout',(req,res)=>{
	
		//get access token, authorize.
		//if OK, remove the token from validkeys.json and redirect to login page.
		const obj = fs.readFile('validkeys.json', (err,data)=>{
		data = JSON.parse(data.toString());

		if(data.hasOwnProperty(req.body.user.username)){
			delete  data[req.body.user.username];
		}
		else res.sendStatus(403); //forbidden. Cant logout without login.
	})
	//save the file.
	fs.writeFile('validkeys.json', JSON.stringify(obj),(err)=>{
		console.log(err);
	})
});
app.get('/dashboard',users.authenticateToken, (req, res)=>{ //users.authenticateToken is the middleware.

	//token OK
	//redirect to dashboard of req.user . >>>>>>>>


	res.json({msg: 'login success!'}); //TEST MESSAGE.
});
app.post('/checkRegistrationStatus',(req,res)=>{ 


	//check user registered or not. >>>>>>>
	console.log(req.body);
	res.send({msg: 'checking registration status'});
});
app.post('/registerForum',(req,res)=>{ 

	// register a forum. >>>>>>>

	console.log(req.body);
	res.send({msg:'registered user.'});
});

app.listen(port_number, ()=>{
	console.log('server up and running on port:' + String(port_number));
})
