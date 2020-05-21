/*
In short, what you need to do to send messages, would be the following:

    Create a Nodemailer transporter using either SMTP or some other transport mechanism
    Set up message options (who sends what to whom)
    Deliver the message object using the sendMail() method of your previously created transporter


	NOTE: using this module requires a " .env " file that is used to store the USER_EMAIL and PASSWORD environment variables.

*/

const nodemailer = require("nodemailer");

function generateOTP() {
  let OTP = "";
  for (let a = 0; a < 4; a++) {
    OTP += String(Math.round(Math.random() * 10)%10);
  }
  return OTP;
}
function sendMail(subject, content, receiver, callback) {
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
    if (err) return callback(err, undefined);
    else return callback(undefined, info);
  });
}
function sendOTP(OTP, receiver, callback) {
  let newOTP = generateOTP();
  sendMail(
    "ARMA OTP",
    "Your A.R.M.A OTP is " + String(newOTP),
    receiver,
    (err, info) => {
      if (err) return callback(err, undefined);
      else {
        return callback(undefined, `OTP has been sent to ${receiver}`);
      }
    }
  );
}

module.exports = {
  generateOTP: generateOTP,
  sendMail: sendMail,
  sendOTP: sendOTP,
};
