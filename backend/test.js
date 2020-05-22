require('dotenv').config();
const users = require('./node/users.js');

users.registerForum('codingStudio','1234','c2@csmail.com','9999999999',(err, state)=>{
    console.log(err||state);
})