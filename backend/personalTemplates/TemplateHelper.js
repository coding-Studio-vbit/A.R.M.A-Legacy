const fs = require("fs");
const path = require("path");
const docxTemplater = require("docxtemplater");
const mammoth = require("mammoth");
const { Client } = require("pg");
const PizZip = require("pizzip");

async function readDocx(filepath) {
  //returns the text content of the word doc.

  return new Promise((resolve, reject) => {
    mammoth
      .extractRawText({ path: filepath })
      .then((result) => {
        resolve(result.value);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}

async function checkPlaceHolders(filepath) {
  //checks if the placeholders in a file are valid or not.

  return new Promise((resolve, reject) => {
    readDocx(filepath)
      .then((text) => {
        let regex = /\{[a-zA-Z_]*}/g;
        let arr = text.match(regex);
        arr.forEach((str) => {
          let allowed = [
            "{designation}",
            "{department}",
            "{date}",
            "{subject}",
            "{respects}",
            "{team_name}",
            "{event_name}",
            "{fromdate}",
            "{todate}",
            "{letter_body}",
            "{hall_name}",
            "{start_hour}",
            "{start_min}",
            "{start_meridian}",
            "{end_hour}",
            "{end_min}",
            "{end_meridian}",
            "{campaignwhere}",
            "{#studentdetails}",
            "{Name}",
            "{Roll}",
            "{/studentdetails}",
          ];
          if (!allowed.includes(str)) return resolve(false);
        });
        return resolve(true);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
async function checkTemplateExists(forum_name, templateName) {
  //checks if a template already exists wi
  return new Promise((resolve, reject) => {
    var client = new Client();
    client.connect();
    client
      .query(
        "SELECT template_name from personal_templates WHERE forum_name=$1 AND template_name=$2;",
        [forum_name, templateName]
      )
      .then((data) => {
        client.end();
        if (data.rows.length > 0) {
          return resolve(true);
        }
        return resolve(false);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
async function insertNewTemplate(forum_name, templateName, filepath) {
  //inserts a new template for the forum by taking its path name.

  return new Promise((resolve, reject) => {
    var client = new Client();
    client.connect();
    //check if template already exists for that forum with same name.
    checkTemplateExists(forum_name, templateName)
      .then((exists) => {
        if (exists)
          return resolve("A template already exists with the same name!");
        return checkPlaceHolders(filepath);
      })
      .then((okay) => {
        if (!okay) return resolve("Placeholders are invalid in the template!");
        client
          .query(
            "INSERT INTO personal_templates(forum_name, template_name, filepath) VALUES ($1,$2,$3)",
            [forum_name, templateName, filepath]
          )
          .then((state) => {
            client.end();
            return resolve("Created new template!");
          })
          .catch((error) => {
            return reject(error);
          });
      });
  });
}
async function fetchPlaceHolders(filepath) {
  //fetches the placeholders of a given template file.
  return new Promise((resolve, reject) => {
    readDocx(filepath)
      .then((text) => {
        let regex = /\{[a-zA-Z_]*}/g;
        let arr = text.match(regex);
        arr = arr.map((str) => {
          return str.slice(1, str.length - 1);
        });
        return resolve(arr);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
async function fetchTemplatePlaceHolders(forum_name, template_name) {
  return new Promise((resolve, reject) => {
    var client = new Client();
    client.connect();
    client
      .query(
        "SELECT filepath FROM personal_templates WHERE forum_name=$1 AND template_name=$2",
        [forum_name, template_name]
      )
      .then((data) => {
        if (data.rows.length == 0)
          return reject("No suck template found for the forum!");
        filepath = data.rows[0].filepath;

        fetchPlaceHolders(filepath)
          .then((placeholders) => {
            return resolve(placeholders);
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
async function fetchForumTemplates(forum_name) {
  //return an array of template names belonging to the forum

  return new Promise((resolve, reject) => {
    var client = new Client();
    client.connect();
    client
      .query(
        "SELECT template_name from personal_template WHERE forum_name=$1",
        [forum_name]
      )
      .then((data) => {
        var arr = [];
        data.rows.forEach((row) => {
          arr.push(row.template_name);
        });
        client.end();
        return resolve(arr);
      })
      .catch((error) => {
        return reject(error);
      });
  });
}
async function generateTemplateLetter(forum_name, template_name, form_data) {
  return new Promise((resolve, reject) => {
    //fetch the filepath of the template.
    var client = new Client();
    client.connect();
    client
      .query(
        "SELECT filepath from personal_templates where forum_name=$1 AND template_name=$2",
        [forum_name, template_name]
      )
      .then((data) => {
        if (data.rows.length == 0)
          return reject("No template found with the given name!");

        var filepath = data.rows[0].filepath;
        console.log(__dirname);
        var content = fs.readFileSync(
          path.resolve(path.join(__dirname, "../"), filepath),
          "binary"
        );
        var zip = new PizZip(content);
        var docx = new docxTemplater();

        docx.loadZip(zip);
        docx.setData(form_data);
        docx.render(); //this will generate the letter.
        var buffer = docx.getZip().generate({ type: "nodebuffer" });
        var filename =
          forum_name + "_" + template_name + "_" + String(Date.now());
        fs.writeFileSync(
          path.join(
            __dirname,
            "../generateTemplateLetters/" + filename + ".docx"
          ),
          buffer
        );
        client.end();
        return resolve(
          path.join(
            __dirname,
            "../generateTemplateLetters/" + filename + ".docx"
          )
        );
      })
      .catch((error) => {
        console.log(error);
        return reject(error);
      });
  });
}

module.exports = {
  insertNewTemplate,
  fetchForumTemplates,
  fetchTemplatePlaceHolders,
  generateTemplateLetter,
};
