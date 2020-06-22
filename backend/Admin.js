const bcrypt = require("bcryptjs");
const {Client} = require("pg");
const users = require('./node/users.js');

async function authenticateAdminLogin(req)
{

	return new Promise((resolve, reject)=>{
		const nice_hash = '$2a$10$aSjlqlMjUFeghTSpgaJ4dOZ1zgfs.dOCs2YWCQQDO31F1k3nsSHd6';// what does sir call shanks?
		if(!req.body.admin_password)
		{
			return resolve( {err: "Inapproprate fields specified!"});
		}
		bcrypt.compare(req.admin_password, nice_hash, (err, stat)=>{
			if(err)
			{
				return reject({err :"Stupid error occured!"});
			}
			if(!stat)
			{
				return reject({err :"Invalid password!"});
			}
			return resolve(true);
		})	
	})
}
async function getNewForumRegistrations()
{
	return new Promise((resolve, reject)=>{
		var client = new Client({
			connectionString: process.env.DATABASE_URL,
			  ssl: {
			    rejectUnauthorized: false
			  }
		});
		client.connect();
		client.query('SELECT * from forum_registration_requests;')
		.then(data=>{
			client.end();
			return resolve(data.rows);
		})
		.catch(error=>{
			client.end();
			return reject(error);
		})
	})
}
async function registerNewForum(req)
{
	return new Promise((resolve, reject)=>{
		if(!req.body.forum_name || !req.body.password || !req.body.email || !req.body.phone)
		{
			return reject("Invalid number of fields provided!");
		}
		var client = new Client({
			connectionString: process.env.DATABASE_URL,
			  ssl: {
			    rejectUnauthorized: false
			  }
		});
		users.registerForum(req.body.forum_name, req.body.password, req.body.email, req.body.phone)
		.then(state=>{
			return resolve("Status of registration: "+ state);
		})
		.catch(error=>{
			return reject(error);
		})
	})
}
async function getNewFacultyRegistrations()
{
	return new Promise((resolve, reject)=>{
		var client = new Client({
			connectionString: process.env.DATABASE_URL,
			  ssl: {
			    rejectUnauthorized: false
			  }
		});
		client.connect();
		client.query('SELECT * from faculty_registration_requests;')
		.then(data=>{
			client.end();
			return resolve(data.rows);
		})
		.catch(error=>{
			client.end();
			return reject(error);
		})
	})
}
async function registerNewFaculty(req)
{
	return new Promise((resolve, reject)=>{
		if(!req.body.faculty_name || !req.body.faculty_roll || !req.body.faculty_dept || !req.body.email || !req.body.phone || !req.body.password)
		{
			return reject("Invalid number of fields provided!");
		}
		var client = new Client({
			connectionString: process.env.DATABASE_URL,
			  ssl: {
			    rejectUnauthorized: false
			  }
		});
		users.registerFaculty(req.body.faculty_name,
							  req.body.faculty_roll,
							  req.body.faculty_dept,
							  req.body.email,
							  req.body.phone,
							  req.body.password)
		.then(state=>{
			return resolve("Status of registration: "+ state);
		})
		.catch(error=>{
			return reject(error);
		})
	})
}
