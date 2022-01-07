const axios = require('../services/axios');
const professionalsService = require('../services/professionalsService');
const generate = require('../test/utils/generateRandomData');
const createProfessionalAndClient = require('./utils/generateProfessionalAndClient');

test('Should get professionals', async function () {
  const newUserOne = await createProfessionalAndClient.saveProfessionalOnDB();

  const newUserTwo = await createProfessionalAndClient.saveProfessionalOnDB();

  const newUserThree = await createProfessionalAndClient.saveProfessionalOnDB();

  const response = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professionals',
    'get'
  );
  expect(response.status).toBe(200);

  const professionals = response.data;
  expect(professionals).toHaveLength(3);
  await professionalsService.deleteProfessional(newUserOne.id);
  await professionalsService.deleteProfessional(newUserTwo.id);
  await professionalsService.deleteProfessional(newUserThree.id);
});

test('Should save professional', async function () {
  const data = createProfessionalAndClient.saveProfessionalData();

  const response = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    data
  );
  expect(response.status).toBe(201);

  const professional = response.data;

  expect(professional.name).toBe(data.name);
  expect(professional.surname).toBe(data.surname);
  await professionalsService.deleteProfessional(professional.id);
});

test('Should not save professional', async function () {
  const data = createProfessionalAndClient.saveProfessionalData();

  const responseOne = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    data
  );
  const responseTwo = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    data
  );
  expect(responseOne.status).toBe(201);
  expect(responseTwo.status).toBe(409);

  const professional = responseOne.data;
  await professionalsService.deleteProfessional(professional.id);
});

test('Should update professional', async function () {
  const professional = await createProfessionalAndClient.saveProfessionalOnDB();

  professional.name = generate.RandomHexString();
  professional.surname = generate.RandomHexString();

  const response = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'put',
    professional
  );
  expect(response.status).toBe(204);

  const updatedProfessional = await professionalsService.getProfessional(
    professional.id
  );

  expect(updatedProfessional.name).toBe(professional.name);
  expect(updatedProfessional.surname).toBe(professional.surname);
  await professionalsService.deleteProfessional(professional.id);
});

test('Should not update professional', async function () {
  const professional = {
    id: 1,
  };

  const response = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'put',
    professional
  );
  expect(response.status).toBe(404);
});

test('Should delete professional', async function () {
  const professional = await createProfessionalAndClient.saveProfessionalOnDB();

  const response = await axios.requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'delete'
  );
  expect(response.status).toBe(204);
  const professionals = await professionalsService.getProfessionals();
  expect(professionals).toHaveLength(0);
});
