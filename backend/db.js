const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  // password: "yasaswiraj1304",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "armadb"
})

module.exports = pool;
