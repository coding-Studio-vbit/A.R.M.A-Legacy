require('dotenv').config();
const users = require("./node/users");

users.registerFaculty("Yashwanth","16P61A05m0","CSE","s1th@gmail.com","9797979979","1234",(err, state)=>{
	console.log(err||state);
});
