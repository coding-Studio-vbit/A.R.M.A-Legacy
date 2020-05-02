const {Client} = require('pg');
const jwt = require('jsonwebtoken');
const fs = require('fs');



async function generateAccessToken(data, secret, expirationTimeSeconds){
	if(expirationDate == undefined) return jwt.sign(data,secret);
	return jwt.sign(data,secret, {expiresIn: expirationTimeSeconds});
}


//This function takes a req and checks the token present in the headers.authorization property,
//if it is then it assigns the request a 'user' property.

async function authenticateToken(request, res, next){ //use this as the middleware.
	const header = request.headers['authorization'];
	const token = header && header.split(' ')[1];
 
	if(token == null) return res.sendStatus(401);

	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,username)=>{
		if(err) return res.sendStatus(403);

		//check if the token is still in the validkeys.json file. >>>>>>	

		req.username = username;
		next();
	});
}
async function checkForumPassword(username,pwdhash,callback){

	var client = new Client();
	await client.connect();

	client.query("SELECT pwd_hash FROM FORUMS WHERE forum_name= $1 ;",[username],(err,res)=>{
		if(err)
		{
			await client.end();
			return callback(err,undefined);
		}
		else
		{
			if(res.rowCount === 1 && res.rows[0].pwd_hash===pwdhash)
			{
				await client.end();
				return callback(undefined, true);
			}
			await client.end();
			return callback(undefined,false);
		}
	});
}

async function checkRegistrationStatus(forum_name,callback){
		
		var client = new Client();
		await client.connect();

		client.query("SELECT forum_name FROM FORUMS WHERE forum_name= $1;",[forum_name],(err,res)=>{
				if(err)
				{
					await client.end();
					return callback(err,null);
				}
				else
				{
					if(res.rowCount === 0){ 
							await client.end();
							return callback(undefined,false);
					}
					else{
							await client.end();
							return callback(undefined, true);
					}
				}

			});
}
async function registerForum(forum_name, pwd_hash,email,phone,callback)
{ 
		//returns status of registration (true or false)
		var client = new Client();
		await client.connect();

		checkRegistrationStatus(forum_name,(err,res)=>{
			if(res == true){
				await client.end();
				 return callback(undefined, false);
			}
			else{
				client.query("INSERT INTO forums(forum_name,pwd_hash,email,phone_no) VALUES ($1,$2,$3,$4);", [forum_name,pwd_hash,email,phone],(err,res)=>{
					
					if(err)
					{
						await client.end();
						return callback(err,undefined);
					}
					else
					{
						await client.end();
						return callback(undefined, true);
					}
				});
			}
		});
}

module.exports = {
	checkForumPassword: checkForumPassword,
	checkRegistrationStatus: checkRegistrationStatus,
	registerForum:registerForum
}
