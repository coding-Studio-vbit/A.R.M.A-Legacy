const validator = require('validator');

function validateRegistrationData(data, callback)
{
	// forum_name, email, phone.
	let errors = {};


	//check for emptiness.
	if(validator.isEmpty(data.username))errors.username = "Forum name is empty!";
	if(validator.isEmpty(data.email))errors.email = 'E-mail field is empty!';
	if(validator.isEmpty(data.phone))errors.phone= 'Phone field is empty!';

	if(!validator.isEmail(data.email)) errors.email = ' Invalid email address! ';
	
	//check for length of the fields.
	if(!validator.isLength(data.email,{min: undefined, max:128})) errors.email = 'email is too long!';
	if(!validator.isLength(data.username,{min:1, max:128})) errors.username= 'username is too long!';
	if(!validator.isMobilePhone(data.phone, 'en-IN')) errors.phone='phone number is invalid!';
	
	if((Object.getOwnPropertyNames(errors)).length == 0)return callback(undefined, true); //data is valid

	return callback(errors, false); //data is invalid.

}

function validateLoginData(data, callback)
{
	let errors = {};

	//check for emptiness.
	if(validator.isEmpty(data.forum_name))errors.forum_name = "Forum name is empty!";
	if(validator.isEmpty(data.pwd))errors.pwd = 'Password is empty!';
	
	if(Object.getOwnPropertyNames(errors).length == 0)return callback(undefined, true); //data is valid.

	return callback(errors, false); //data is invalid.
}

module.exports = {
	validateRegistrationData: validateRegistrationData,
	validateLoginData: validateLoginData
};
