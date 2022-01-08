require('dotenv').config({ path: '../.env' });
const express = require('express');
const jwt = require('jsonwebtoken');
const authData = require('../data/authData');
const router = express.Router();

router.post('/api/auth', async (req, res, next) => {
  const { username, password } = req.body;

  const id = await authData.authProfessional(username, password);

  if (!id) res.status(401).json({ message: 'ai não' });

  const access_token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 300, // expires in 5min
  });

  return res.json({ auth: true, access_token: access_token });
});

module.exports = router;
