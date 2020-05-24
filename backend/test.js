require('dotenv').config();
const users = require('./node/users.js');

users.registerForum('Vbit-mun','1234','yasaswiraj@gmail.com','9999999999','VBIT-MUN',(err, state)=>{
    console.log(err||state);
})
