require('dotenv').config();
const users = require('./node/users.js');

users.registerForum('stumagz','1234','aaris.jack@gmail.com','9999999999','STUMAGZ',(err, state)=>{
    console.log(err||state);
})
