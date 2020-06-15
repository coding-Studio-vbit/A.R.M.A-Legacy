require('dotenv').config();
const users = require('./node/users.js');

users.registerForum('SSVFORUM','1234','blehbleh@blehmail.com','9999999999')
.then(state=>{
	console.log(state)
}).catch((err)=>{
	console.log(err);
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
