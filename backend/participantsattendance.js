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
    var content = fs.readFileSync(path.resolve(__dirname, './LetterTemplate/ATTENDANCE_FOR_PARTICIPANTS_TEMPLATE.docx'), 'binary');
    var zip = new PizZip(content);

    var docx=new Docxtemplater();
	var json = fs.readFileSync('details.json').toString();
	var jsondata = JSON.parse(json);
    try{

            docx.loadZip(zip);
            docx.setData(
				{

                designation:jsondata.designation,
                department:jsondata.department,
                date:jsondata.date,
        	    subject: jsondata.subject,
        	    respects: jsondata.respects,
                team_name: jsondata.team_name,
                event_name:jsondata.event_name,
                fromdate:jsondata.fromdate,
                todate:jsondata.todate,
                start_hour:jsondata.start_hour,
                start_min:jsondata.start_min,
                start_meridian:jsondata.start_meridian,
                end_hour:jsondata.end_hour,
                end_min:jsondata.end_min,
                end_meridian:jsondata.end_meridian,
                letter_body:jsondata.letter_body,
                studentdetails:jsondata.studentdetails

				}
			);
            docx.render(); //this will generate the template.
            var buffer= docx.getZip().generate({type:"nodebuffer"});

            //timestamp for the output filename
            var currentDate = new Date();
            var timeStamp = currentDate.getTime();
            var filename = 'FINAL_ATTENDANCE_PARTICIPANTS';
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
