require('dotenv').config();
const users = require('./node/users.js');

users.registerForum('StuTalk','1234','mailme@kunaldubey.com','9999999999','StuTalk',(err, state)=>{
    console.log(err||state);
})
