const db = require('../infra/database');

exports.getProfessionals = function () {
  return db.query('select * from professional_info');
};

exports.saveProfessional = function (professional) {
  return db.query('with new_user as (insert into professional_info (name, surname, birthdate, cpf, email, phone, profession, professional_document) values ($1, $2, $3, $4, $5, $6, $7, $8) returning id) insert into professional_user (username, password, professional_id) values ($1, $2, (select id from new_user))returning *;', [
    professional.name,
    professional.surname,
    professional.birthdate,
    professional.cpf,
    professional.email,
    professional.phone,
    professional.profession,
    professional.professional_document,
    professional.username,
    professional.password,
  ]);
};

exports.deleteProfessional = function () {
  return db.none('delete ', []);
};