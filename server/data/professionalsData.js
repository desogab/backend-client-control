const db = require('../infra/database');

exports.getProfessionals = async function () {
  return db.query('select * from professional_info');
}