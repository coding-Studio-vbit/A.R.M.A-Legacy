require("dotenv").config();
const users = require("./users.js");
const { Client } = require("pg");

function getForumTable(req){
  return new Promise((resolve, reject) => {
    users.fetchAccessToken(req)
      .then((token) => {
        return users.authenticateToken(token, process.env.SECRET_ACCESS_TOKEN);
      })
      .then((forum_name) => {
        forum_name = forum_name.toUpperCase();
        const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });
        client.connect();
        client
          .query(
            "select request_id,remarks,status, request_data->'subject' as subject from requests where forum_name=$1",
            [forum_name]
          )
          .then((data) => {
            res.json(data.rows);
            console.log(data);
            client.end();
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });

}

module.export={getForumTable:getForumTable};
