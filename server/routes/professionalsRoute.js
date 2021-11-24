const express = require('express');
const router = express.Router();
const professionalsService = require('../services/professionalsService');

router.get('/api/professionals', async function (req, res, next) {
  try {
    const professionals = await professionalsService.getProfessionals();
    res.json(professionals);
  } catch (error) {
    next(error);
  }
});

router.get('/api/professional/:id', async function (req, res, next) {
  try {
    const professional = await professionalsService.getProfessional(req.params.id);
    res.status(200).json(professional);
  } catch (error) {
    next(error);
  };
});

router.post('/api/professional', async function (req, res, next) {
  const professional = req.body;
  try {
    const createNewProfessional = await professionalsService.saveProfessional(professional);
    res.status(201).json(createNewProfessional);
  } catch (error) {
    next(error);
  }
});

router.put('/api/professional/:id', async function (req, res, next) {
  const professional = req.body;
  try {
    await professionalsService.updateProfessional(req.params.id, professional);
    res.status(204).end();
  } catch (error) {
    next(error);
  };
});

router.delete('/api/professional/:id', async function (req, res, next) {
  try {
    await professionalsService.deleteProfessional(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;