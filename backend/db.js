const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "saikiran",
  host: "localhost",
  port: 5432,
  database: "arpadb"
})

module.exports = pool;
