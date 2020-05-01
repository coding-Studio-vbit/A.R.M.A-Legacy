/*
In short, what you need to do to send messages, would be the following:

    Create a Nodemailer transporter using either SMTP or some other transport mechanism
    Set up message options (who sends what to whom)
    Deliver the message object using the sendMail() method of your previously created transporter


	NOTE: using this module requires a " .env " file that is used to store the USER_EMAIL and PASSWORD environment variables.

*/

const nodemailer = require('nodemailer');
require('dotenv').config();

function generateOTP(){
	let OTP = ""
	for(let a=0;a<4;a++){
	  OTP += String(Math.round(Math.random()*10));
	}
	return OTP;
}
async function sendMail(subject,content, receiver,callback)
{
	var transporter = nodemailer.createTransporter({
		service: 'gmail',
		auth: {
			user: process.env.USER_EMAIL,
			pass: process.env.PASSWORD
		}
	});

	mailOptions = {
		from: process.env.USER_EMAIL,
		to: receiver,
		subject: subject,
		text: content,
	};

	transported.sendMail(mailOptions, (err, info)=>{
		if(err) return callback(err, undefined);
		else return callback(undefined, info);
	});
}
async function sendOTP(OTP,receiver,callback)
{
	let newOTP = generateOTP();
	sendMail('ARMA OTP', ('Your A.R.M.A OTP is '+String(newOTP)),receiver, (err,info)=>{
		if(err) return callback(err,undefined);
		else
		{
			return callback(undefined, `OTP has been sent to ${receiver}`);
		}
	});
}


module.exports = {
	generateOTP: generateOTP,
	sendMail:sendMail,
	sendOTP: sendOTP
};
