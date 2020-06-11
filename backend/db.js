const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "arpadb",
  password: "johncena",
  port: 5432,
});

module.exports = pool;
