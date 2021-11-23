const professionalsData = require('../data/professionalsData');

exports.getProfessionals = function () {
  return professionalsData.getProfessionals();
};

exports.getProfessional = function (id) {
  return professionalsData.getProfessional(id);
}

exports.saveProfessional = function (professional) {
  return professionalsData.saveProfessional(professional);
};

exports.deleteProfessional = function (id) {
  return professionalsData.deleteProfessional(id);
};

exports.updateProfessional = function (id, post) {
  return professionalsData.updateProfessional(id, post);
};