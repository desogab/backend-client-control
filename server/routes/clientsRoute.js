const express = require('express');
const router = express.Router();
const clientsService = require('../services/clientsService');

router.post('/api/client', async function (req, res, next) {
  const client = req.body;
  try {
    const createNewClient = await clientsService.saveClient(client);
    res.status(201).json(createNewClient);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
