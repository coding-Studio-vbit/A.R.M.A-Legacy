const express = require('express');
const path = require('path');
const body_parser = require('body-parser');


const port_number = 8080 //TEST
const app = express();


//express configuration
app.use(express.static(path.join(__dirname, "/public")));

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
	res.sendFile('index.html');
});
app.post('/LoginAuth',(req,res)=>{ // checking password.
	console.log(req.body); //yet to connect.
	res.send({msg: 'checking Login info'});
});
app.post('/CheckRegistrationStatus',(req,res)=>{ //check user registered or not.
	console.log(req.body); //yet to connect.

	res.send({msg: 'checking registration status'});
});
app.post('/RegisterForum',(req,res)=>{ // register a forum.
	console.log(req.body); //yet to connect.

	res.send({msg:'registered user.'});
});

app.listen(port_number, ()=>{
	console.log('server up and running on port:' + String(port_number));
})
