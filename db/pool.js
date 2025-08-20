require("dotenv").config();
const { Pool } = require("pg");

// console.log(process.env.DB_USER);

module.exports = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
