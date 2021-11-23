const express = require('express');
const router = express.Router();
const professionalsService = require('../services/professionalsService');

router.get('/api/professionals', async function (req, res) {
  const professionals = await professionalsService.getProfessionals();
  res.json(professionals);
});

// router.get('/api/professionals/:id', async function (req, res) {

// });
router.post('/api/professionals', async function (req, res) {
  const professional = req.body;
  const createNewProfessional = await professionalsService.saveProfessional(professional);
  res.json(createNewProfessional);
});
// router.put('/api/professionals/:id', async function (req, res) {

// });
// router.delete('/api/professionals/:id', async function (req, res) {

// });

module.exports = router;