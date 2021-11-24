const professionalsData = require('../data/professionalsData');

exports.getProfessionals = function () {
  return professionalsData.getProfessionals();
};

exports.getProfessional = async function (id) {
  const professional = await professionalsData.getProfessional(id);
  if (!professional) throw new Error('Professional not found');
  return professional;
}

exports.saveProfessional = async function (professional) {
  const existingProfessional = await professionalsData.getProfessionalByTitle(professional.username);
  if (existingProfessional) throw new Error('Professional already exists');
  return professionalsData.saveProfessional(professional);
};

exports.deleteProfessional = function (id) {
  return professionalsData.deleteProfessional(id);
};

exports.updateProfessional = async function (id, professional) {
  await exports.getProfessional(id);
  return professionalsData.updateProfessional(id, professional);
};