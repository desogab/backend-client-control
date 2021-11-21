const professionalsData = require('../data/professionalsData');

exports.getProfessionals = function () {
  return professionalsData.getProfessionals();
};

exports.saveProfessional = function (professional) {
  return professionalsData.saveProfessional(professional);
};

exports.deleteProfessional = function (id) {
  return professionalsData.deleteProfessional(id);
}