require('dotenv').config({ path: '../.env' })
const pgp = require('pg-promise')({
  capSQL: true,
});

const db = pgp({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

module.exports = db;