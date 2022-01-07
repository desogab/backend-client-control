const express = require('express');
const router = express.Router();
const clientsService = require('../services/clientsService');

router.get('/api/client', async function (req, res, next) {
  try {
    const clients = await clientsService.getClients();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
});

router.get('/api/client/:id', async function (req, res, next) {
  const clientId = req.params.id;
  try {
    const client = await clientsService.getClient(clientId);
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});

router.post('/api/client', async function (req, res, next) {
  const client = req.body;
  try {
    const createNewClient = await clientsService.saveClient(client);
    res.status(201).json(createNewClient);
  } catch (error) {
    next(error);
  }
});

router.delete('/api/client/:id', async function (req, res, next) {
  const clientId = req.params.id;
  try {
    await clientsService.deleteClient(clientId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
