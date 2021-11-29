require('dotenv').config({ path: '../.env' });
const pgp = require('pg-promise')({
  capSQL: true,
  error(err, e) {
    if (e.query) {
      // console.log('query', err.detail);
      if (e.params) {
        // console.log('params', err.detail);
      }
    }
    if (e.ctx) {
      // console.log('params', err.detail);
    }
  }
});

const db = pgp({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

module.exports = db;
