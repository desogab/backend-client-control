const professionalsService = require('../../services/professionalsService');
const clientsService = require('../../services/clientsService');
const generate = require('./generateRandomData');

exports.saveProfessionalOnDB = () => {
  const professional = professionalsService.saveProfessional({
    name: generate.RandomHexString(),
    surname: generate.RandomHexString(),
    birthdate: generate.RandomDateTime(),
    cpf: generate.RandomHexString(),
    email: generate.RandomHexString(),
    phone: generate.RandomHexString(),
    profession: generate.RandomProfession(),
    professional_document: generate.RandomHexString(),
    username: generate.RandomHexString(),
    password: generate.RandomHexString(),
  });
  return professional;
};

exports.saveProfessionalData = () => {
  const professional = {
    name: generate.RandomHexString(),
    surname: generate.RandomHexString(),
    birthdate: generate.RandomDateTime(),
    cpf: generate.RandomHexString(),
    email: generate.RandomHexString(),
    phone: generate.RandomHexString(),
    profession: generate.RandomProfession(),
    professional_document: generate.RandomHexString(),
    username: generate.RandomHexString(),
    password: generate.RandomHexString(),
  };
  return professional;
};

exports.saveClientOnDB = (professionalId) => {
  const client = clientsService.saveClient({
    active: true,
    sponsor: true,
    name: generate.RandomHexString(),
    surname: generate.RandomHexString(),
    birthdate: generate.RandomDateTime(),
    cpf: generate.RandomHexString(),
    email: generate.RandomHexString(),
    phone: generate.RandomHexString(),
    consultation_price: 200,
    professional_id: professionalId,
    street: generate.RandomHexString(),
    district: generate.RandomHexString(),
    number: 12,
    city: generate.RandomHexString(),
    complement: generate.RandomHexString(),
    state: 'RJ',
    zipcode: generate.RandomHexString(),
    emergency_name: generate.RandomHexString(),
    emergency_surname: generate.RandomHexString(),
    emergency_phone: generate.RandomHexString(),
    sponsor_name: generate.RandomHexString(),
    sponsor_surname: generate.RandomHexString(),
    sponsor_cpf: generate.RandomHexString(),
  });
  return client;
};
// consultation_price e state estão de forma estática
exports.saveClientData = (professionalId) => {
  const client = {
    active: true,
    sponsor: true,
    name: generate.RandomHexString(),
    surname: generate.RandomHexString(),
    birthdate: generate.RandomDateTime(),
    cpf: generate.RandomHexString(),
    email: generate.RandomHexString(),
    phone: generate.RandomHexString(),
    consultation_price: 200,
    professional_id: professionalId,
    street: generate.RandomHexString(),
    district: generate.RandomHexString(),
    number: 12,
    city: generate.RandomHexString(),
    complement: generate.RandomHexString(),
    state: 'RJ',
    zipcode: generate.RandomHexString(),
    emergency_name: generate.RandomHexString(),
    emergency_surname: generate.RandomHexString(),
    emergency_phone: generate.RandomHexString(),
    sponsor_name: generate.RandomHexString(),
    sponsor_surname: generate.RandomHexString(),
    sponsor_cpf: generate.RandomHexString(),
  };
  return client;
};
