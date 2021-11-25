const express = require('express');
const app = express();

app.use(express.json());

app.use('/', require('./routes/professionalsRoute'));

app.use(function (error, req, res, next) {
  if (error.message === 'Professional already exists') {
    return res.status(409).send(error.message);
  }
  if (error.message === 'Professional not found') {
    return res.status(404).send(error.message);
  }
  res.status(500).send(error.message);
});

app.listen(3333);
