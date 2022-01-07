const axios = require('../services/axios');
const clientsService = require('../services/clientsService');
const professionalsService = require('../services/professionalsService');
const generate = require('./utils/generateRandomData');
const createProfessionalAndClient = require('./utils/generateProfessionalAndClient');

test('Shoud get clients', async function () {
  const newProfessional = createProfessionalAndClient.saveProfessionalData();

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional
  );

  //verificar a criação do profissional 201
  const professional = responseProfessional.data;

  //criar um cliente atrelando o professional_id ao id do profissional
  const professionalId = professional.id;

  const clientOne = await createProfessionalAndClient.saveClientOnDB(
    professionalId
  );

  const clientTwo = await createProfessionalAndClient.saveClientOnDB(
    professionalId
  );

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
  const newProfessional = createProfessionalAndClient.saveProfessionalData();

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional
  );

  //verificar a criação do profissional 201
  const professional = responseProfessional.data;

  //criar um cliente atrelando o professional_id ao id do profissional
  const professionalId = professional.id;

  const data = createProfessionalAndClient.saveClientData(professionalId);

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
  const professional = await createProfessionalAndClient.saveProfessionalOnDB();

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get'
  );

  expect(responseProfessional.status).toBe(200);

  const professionalId = responseProfessional.data.id;

  const data = createProfessionalAndClient.saveClientData(professionalId);

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
  const professional = await createProfessionalAndClient.saveProfessionalOnDB();

  const responseProfessional = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get'
  );

  expect(responseProfessional.status).toBe(200);

  const professionalId = responseProfessional.data.id;

  const data = createProfessionalAndClient.saveClientData(professionalId);

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
