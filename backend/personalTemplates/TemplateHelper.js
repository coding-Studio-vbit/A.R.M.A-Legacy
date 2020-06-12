const fs = require('fs');
const docxTemplater = require('docxtemplater');
const mammoth = require('mammoth');
const {Client} = require('pg');


async function readDocx(filepath)
{
	return new Promise((resolve, reject)=>{
		mammoth.extractRawText({path: filepath})
		.then((result)=>{
			resolve(result.value);
		})
		.catch(error=>{
			return reject(error);
		})
	});
}

async function checkPlaceHolders(filepath)
{
	return new Promise((resolve, reject)=>{
		readDocx(filepath)
		.then(text=>{
			let regex = /\{[a-zA-Z]*}/g;
			let arr = text.match(regex)
			arr.forEach(str=>{
				
				let allowed = [
					'{designation}',
					'{department}',
					'{date}',
					'{subject}',
					'{respects}',
					'{team_name}',
					'{event_name}',
					'{fromdate}',
					'{todate}',
					'{letter_body}',
					'{hall_name}',
					'{start_hour}',
					'{start_min}',
					'{start_meridian}',
					'{end_hour}',
					'{end_min}',
					'{end_meridian}',
					'{campaignwhere}',
					'{#studentdetails}',
					'{Name}',
					'{Roll}',
					'{/studentdetails}',
				];
				if(!allowed.includes(str)) return reject("Invalid placeholder "+str);
			});
			return resolve();
		})
		.catch(error=>{
			return reject(error);
		})
	})
}

async function insertNewTemplate(templateName, filepath)
{
	return new Promise((resolve, reject)=>{
		var client = new Client();
		client.connect();

	})
}

module.exports = {
	readDocx,
	checkPlaceHolders
};
