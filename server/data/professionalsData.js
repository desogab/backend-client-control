const db = require('../infra/database');

exports.getProfessionals = function () {
  return db.query('select * from professional_info');
};

exports.getProfessional = function (id) {
  return db.oneOrNone('select * from professional_info where id = $1', [id]);
}

exports.saveProfessional = function (professional) {
  return db.one('with new_user as (insert into professional_user(username, password)values($1, $2)returning *) insert into professional_info(name, surname, birthdate, cpf, email, phone, profession, professional_document, user_id) values ($3, $4, $5, $6, $7, $8, $9, $10,(select id from new_user)) returning *', [
    professional.username,
    professional.password,
    professional.name,
    professional.surname,
    professional.birthdate,
    professional.cpf,
    professional.email,
    professional.phone,
    professional.profession,
    professional.professional_document,
  ]);
};

exports.deleteProfessional = function (id) {
  return db.none('delete from professional_user where id = $1', [id]);
};

//TODO: adicionar campos editaveis depois;
exports.updateProfessional = function (id, professional) {
  return db.none('update professional_info set name = $1, surname = $2 where id = $3', [professional.name, professional.surname, id]);
}