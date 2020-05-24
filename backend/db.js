const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "armadb",
  password: "Vishnu",
  port: 5432
  
})

module.exports = pool;
