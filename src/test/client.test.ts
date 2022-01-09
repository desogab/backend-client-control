import { requestWhitoutValidateStatus } from '../services/axios';

const clientsService = require('../services/clientsService');
const professionalsService = require('../services/professionalsService');
const generate = require('./utils/generateRandomData');
const createProfessionalAndClient = require('./utils/generateProfessionalAndClient');

test('Shoud get clients', async () => {
  const newProfessional = createProfessionalAndClient.saveProfessionalData();

  const responseProfessional = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional,
  );
  // verificar a criação do profissional 201
  const professional = responseProfessional.data;

  // criar um cliente atrelando o professional_id ao id do profissional
  const professionalId = professional.id;

  const clientOne = await createProfessionalAndClient.saveClientOnDB(
    professionalId,
  );

  const clientTwo = await createProfessionalAndClient.saveClientOnDB(
    professionalId,
  );

  const responseClient = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'get',
  );
  expect(responseClient.status).toBe(200);

  const client = responseClient.data;

  expect(client).toHaveLength(2);
  await professionalsService.deleteProfessional(professionalId);
  await clientsService.deleteClient(clientOne.id);
  await clientsService.deleteClient(clientTwo.id);
});

test('Should get client', async () => {
  // criar um client
  const newProfessional = createProfessionalAndClient.saveProfessionalData();

  const responseProfessional = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional,
  );

  const professional = responseProfessional.data;

  const professionalId = professional.id;

  const data = createProfessionalAndClient.saveClientData(professionalId);

  const client = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data,
  );
  expect(client.status).toBe(201);

  const clientId = client.data.id;

  const responseClient = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/client/${clientId}`,
    'get',
  );
  expect(responseClient.status).toBe(200);
  await clientsService.deleteClient(clientId);
  await professionalsService.deleteProfessional(professionalId);
});

test('Should save client', async () => {
  const professional = await createProfessionalAndClient.saveProfessionalOnDB();

  const responseProfessional = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get',
  );

  expect(responseProfessional.status).toBe(200);

  const professionalId = responseProfessional.data.id;

  const data = createProfessionalAndClient.saveClientData(professionalId);

  const response = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data,
  );

  expect(response.status).toBe(201);

  const client = response.data;

  await clientsService.deleteClient(client.client_id);
  await professionalsService.deleteProfessional(professionalId);
});

test('Shoud update client', async () => {
  const professional = createProfessionalAndClient.saveProfessionalData();
  const createProfessional = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    professional,
  );

  const responseProfessional = createProfessional.data;
  const professionalId = responseProfessional.id;

  const client = await createProfessionalAndClient.saveClientOnDB(
    professionalId,
  );

  client.name = generate.RandomHexString();
  client.surname = generate.RandomHexString();

  const response = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/client/${client.id}`,
    'put',
    client,
    { 'X-Professional-ID': professionalId },
  );

  expect(response.status).toBe(204);

  const updateClient = await clientsService.getClient(client.id);
  expect(updateClient.name).toBe(client.name);
  expect(updateClient.surname).toBe(client.surname);
  await professionalsService.deleteProfessional(responseProfessional.id);
  await clientsService.deleteClient(client.id);
});

// test('Shoud not update client', async function () {});

test('Should not save', async () => {
  const professional = await createProfessionalAndClient.saveProfessionalOnDB();

  const responseProfessional = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get',
  );

  expect(responseProfessional.status).toBe(200);

  const professionalId = responseProfessional.data.id;

  const data = createProfessionalAndClient.saveClientData(professionalId);

  const responseClientOne = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data,
  );

  const responseClientTwo = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data,
  );

  expect(responseClientOne.status).toBe(201);
  expect(responseClientTwo.status).toBe(500);

  const client = responseClientOne.data;

  await clientsService.deleteClient(client.client_id);
  await professionalsService.deleteProfessional(professionalId);
});
