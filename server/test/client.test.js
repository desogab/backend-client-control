const axios = require('../services/axios');
const clientsService = require('../services/clientsService');
const professionalsService = require('../services/professionalsService');
const generate = require('./utils/generateRandomData');

test('Shoud get clients', async function () {
  const newProfessional = {
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

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional
  );

  //verificar a criação do profissional 201
  const professional = responseProfessional.data;

  //criar um cliente atrelando o professional_id ao id do profissional
  const professionalId = professional.id;

  const clientOne = await clientsService.saveClient({
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

  const clientTwo = await clientsService.saveClient({
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

  const responseClient = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/client`,
    'get'
  );
  expect(responseClient.status).toBe(200);

  const client = responseClient.data;

  expect(client).toHaveLength(2);
  await professionalsService.deleteProfessional(professionalId);
  await clientsService.deleteClient(clientOne.id);
  await clientsService.deleteClient(clientTwo.id);
});

test('Should get client', async function () {
  //criar um client
  const newProfessional = {
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

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional
  );

  //verificar a criação do profissional 201
  const professional = responseProfessional.data;

  //criar um cliente atrelando o professional_id ao id do profissional
  const professionalId = professional.id;

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
    sponsor_cpf: generate.RandomHexString(),
  };

  //apos a criação o status deve ser  201
  const client = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  );
  expect(client.status).toBe(201);

  const clientId = client.data.id;

  //chamo o novo cliente com a requisição GET, status 200
  const responseClient = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/client/${clientId}`,
    'get'
  );
  expect(responseClient.status).toBe(200);
  //apago o profissional e o cliente, status 204
  await clientsService.deleteClient(clientId);
  await professionalsService.deleteProfessional(professionalId);
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
    password: generate.RandomHexString(),
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
    sponsor_cpf: generate.RandomHexString(),
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

// test('Shoud update client', function () {});

// test('Shoud not update client', function () {});

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
    password: generate.RandomHexString(),
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
    sponsor_cpf: generate.RandomHexString(),
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
