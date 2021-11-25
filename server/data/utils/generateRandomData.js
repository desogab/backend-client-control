require('dotenv').config({ path: '../../../.env' });
const crypto = require('crypto');

exports.RandomHexString = function () {
  return crypto.randomBytes(5).toString('hex');
};

exports.RandomDateTime = function () {
  const date = new Date();
  return date.toISOString();
};

exports.RandomProfession = function () {
  const selectProfession = [
    'PSICOLOGO',
    'PSICOLOGA',
    'NUTRICIONISTA',
    'DENTISTA'
  ];
  const getRandomProfession =
    selectProfession[Math.floor(Math.random() * selectProfession.length)];
  return getRandomProfession;
};
