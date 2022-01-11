import pgPromise from 'pg-promise'

const pgp = pgPromise({
  capSQL: true
})

const db = pgp({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: process.env.DATABASE
})

export default db
