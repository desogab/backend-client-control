const axios = require('../services/axios');
const clientsService = require('../services/clientsService');
const professionalsService = require('../services/professionalsService');
const generate = require('../utils/generateRandomData');

test.only('Should get client', async function () {
  //criar um profissional
  const professional = await professionalsService.saveProfessional({
    name: generate.RandomHexString(),
    surname: generate.RandomHexString(),
    birthdate: generate.RandomDateTime(),
    cpf: generate.RandomHexString(),
    email: generate.RandomHexString(),
    phone: generate.RandomHexString(),
    profession: generate.RandomProfession(),
    professional_document: generate.RandomHexString(),
    username: generate.RandomHexString(),
    password: generate.RandomHexString()
  });

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/professional',
    'post',
    professional
  );

  expect(responseProfessional.status).toBe(200);

  const professionalId = responseProfessional.data.id;

  const data = {
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
    sponsor_cpf: generate.RandomHexString()
  };

  //verificar a criação do profissional 201
  //criar um cliente atrelando o professional_id ao id do profissional
  //apos a criação o status deve ser  201
  //chamo o novo cliente com a requisição GET, status 200
  //apago o profissional e o cliente, status 204
});

test('Should save client', async function () {
  const professional = await professionalsService.saveProfessional({
    name: generate.RandomHexString(),
    surname: generate.RandomHexString(),
    birthdate: generate.RandomDateTime(),
    cpf: generate.RandomHexString(),
    email: generate.RandomHexString(),
    phone: generate.RandomHexString(),
    profession: generate.RandomProfession(),
    professional_document: generate.RandomHexString(),
    username: generate.RandomHexString(),
    password: generate.RandomHexString()
  });

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get'
  );

  expect(responseProfessional.status).toBe(200);

  const professionalId = responseProfessional.data.id;

  const data = {
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
    sponsor_cpf: generate.RandomHexString()
  };

  const response = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  );

  expect(response.status).toBe(201);

  const client = response.data;

  await clientsService.deleteClient(client.client_id);
  await professionalsService.deleteProfessional(professionalId);
});

test('Should not save', async function () {
  const professional = await professionalsService.saveProfessional({
    name: generate.RandomHexString(),
    surname: generate.RandomHexString(),
    birthdate: generate.RandomDateTime(),
    cpf: generate.RandomHexString(),
    email: generate.RandomHexString(),
    phone: generate.RandomHexString(),
    profession: generate.RandomProfession(),
    professional_document: generate.RandomHexString(),
    username: generate.RandomHexString(),
    password: generate.RandomHexString()
  });

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get'
  );

  expect(responseProfessional.status).toBe(200);

  const professionalId = responseProfessional.data.id;

  const data = {
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
    sponsor_cpf: generate.RandomHexString()
  };

  const responseClientOne = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  );

  const responseClientTwo = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  );

  expect(responseClientOne.status).toBe(201);
  expect(responseClientTwo.status).toBe(500);

  const client = responseClientOne.data;

  await clientsService.deleteClient(client.client_id);
  await professionalsService.deleteProfessional(professionalId);
});
