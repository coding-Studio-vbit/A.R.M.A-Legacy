const fs = require('fs');
const docxTemplater = require('docxtemplater')
const mammoth = require('mammoth')


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
					'','','',

				];
				
				if(!allowed.includes(str)) return reject("Invalid placeholder");
			});
			return resolve();
		})
		.catch(error=>{
			return reject(error);
		})
	});
}

checkPlaceHolders('./TeamAttendanceTemplate.docx')
.then(()=>{
})
.catch(error=>{
	console.log(error);
})
