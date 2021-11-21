const db = require('../infra/database');

exports.getProfessionals = async function () {
  return db.query('select * from professional_user');
};

exports.saveProfessional = function (professional) {
  return db.one('insert into professional_user (username, password) values ($1, $2) returning *', [professional.username, professional.password]);
};

exports.deleteProfessional = function (id) {
  return db.none('delete from professional_user where id = $1', [id]);
};