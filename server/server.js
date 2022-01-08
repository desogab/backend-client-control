require('dotenv').config({ path: '../.env' });
const express = require('express');
const jwt = require('express-jwt');
const app = express();

app.use(express.json());
app.use(
  '/',
  jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
    path: ['/api/auth'],
  })
);

app.use(require('./routes/professionalsRoute'));
app.use(require('./routes/clientsRoute'));
app.use(require('./routes/auth'));

app.use(function (error, req, res, next) {
  if (error.message === 'Already exists') {
    return res.status(409).send(error.message);
  }
  if (error.message === 'Not found') {
    return res.status(404).send(error.message);
  }
  // res.status(500).send(error.message);
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
