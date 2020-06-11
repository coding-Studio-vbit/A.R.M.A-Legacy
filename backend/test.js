require('dotenv').config();
const users = require('./node/users.js');

users.registerFaculty("Saravanan","18P61A05J1","CSE","sar11@sarvi.com","9999999999","1234")
.then((state)=>{
	console.log(state);
}).catch(error=>{
	console.log(error);
})

/*
	//user this to register forums.
	
	users.registerForum("coding.Studio();","passwordpassword", "geemail@gmail.com", "9999999999" )
	.then(state=>{
		console.log("Registration status:" + state);
	}).catch(error=>{
		console.log("Error occured: "+error);
	})
*/
