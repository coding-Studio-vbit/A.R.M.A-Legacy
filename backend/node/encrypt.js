const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function hashPassword(user) {
  const password = user;
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/hashpassword", async (req, res) => {
  let ps = req.body.password;
  let ff = await hashPassword(ps);
  res.json({ password: ff });
});

app.listen(3001, () => {
  console.log("server started2");
});
