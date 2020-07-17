var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var express = require('express');
var bodyParser =require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var fs = require('fs');
var path = require('path');
var urlencodedParser = bodyParser.urlencoded({ extended: true});


module.exports = {

generateLetterIndividual: function generateLetterIndividual()
{
    var content = fs.readFileSync(path.resolve(__dirname, './LetterTemplate/ALLOW_FOR_LAB_EXAM.docx'), 'binary');
    var zip = new PizZip(content);

    var docx=new Docxtemplater();
	var json = fs.readFileSync('details.json').toString();
	var jsondata = JSON.parse(json);
    try{

            docx.loadZip(zip);
            docx.setData(
				{

                 department:jsondata.department,
                  date:jsondata.date,
        	        subject: jsondata.subject,
        	        respects: jsondata.respects,
                  your_name: jsondata.your_name,
                  year: jsondata.year,
                  section: jsondata.section,
                  roll_no: jsondata.roll_no,
                  reason: jsondata.reason,
                  exam:jsondata.exam,
                  hod_name: jsondata.hod_name,
                  faculty_name: jsondata.faculty_name,
                  faculty: jsondata.faculty

				}
			);
            docx.render(); //this will generate the template.
            var buffer= docx.getZip().generate({type:"nodebuffer"});

            //timestamp for the output filename
            var currentDate = new Date();
            var timeStamp = currentDate.getTime();
            var filename = 'allowtolabexam';
            fs.writeFileSync(`./LetterGenerated/${filename}.docx`,buffer);
			console.log('Letter Generated');
			docx.render();
			buffer = docx.getZip().generate({type:"nodebuffer"});

    }
    catch(error)
    {
        errorHandler(error);
    }
}
};
