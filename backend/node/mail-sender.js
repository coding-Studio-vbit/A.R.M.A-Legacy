/*
In short, what you need to do to send messages, would be the following:

    Create a Nodemailer transporter using either SMTP or some other transport mechanism
    Set up message options (who sends what to whom)
    Deliver the message object using the sendMail() method of your previously created transporter


	NOTE: using this module requires a " .env " file that is used to store the USER_EMAIL and PASSWORD environment variables.

*/
const nodemailer = require("nodemailer");

async function generateOTP() {
	return new Promise((resolve , reject)=>{
  		let OTP = "";
  		for (let a = 0; a < 4; a++) {
  		  OTP += String(Math.round(Math.random() * 10)%10);
  		}
  		resolve(OTP);
	})
}
async function sendMail(subject, content, receiver) {
	return new Promise((resolve, reject)=>{
		
  			var transporter = nodemailer.createTransport({
  			  service: "gmail",
  			  auth: {
  			    user: process.env.USERMAIL,
  			    pass: process.env.PASSWORD,
  			  },
  			  tls: {
  			    rejectUnauthorized: false,
  			  },
  			});

  			mailOptions = {
  			  from: process.env.USERMAIL,
  			  to: receiver,
  			  subject: subject,
  			  text: content,
  			};

  			transporter.sendMail(mailOptions, (err, info) => {
  			  if (err) return reject(err);
  			  else return resolve(info);
  			});
	});
}
async function sendOTP(OTP, receiver) {
	 return new Promise((resolve, reject)=>{
  			generateOTP()
			.then((OTP)=>
  				sendMail("ARMA OTP","Your A.R.M.A OTP is " + String(newOTP), receiver) 
				.then((info) => {
  			   	 if (err) return callback(err, undefined);
  			   	 else {
  			   	   return callback(undefined, `OTP has been sent to ${receiver}`);
  			   	 }
  			  	})
				.catch(err=>reject(err))
  			)
			.catch(err=>reject(err))
	 });
}
module.exports = {
  generateOTP: generateOTP,
  sendMail: sendMail,
  sendOTP: sendOTP,
};
