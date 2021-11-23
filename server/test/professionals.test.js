const axios = require('axios');
const crypto = require('crypto');
const professionalsService = require('../services/professionalsService');

//gera caracteres aleatorios para testes
// isso evita perder tempo pensando em nomes ou editando campos.
//não é responsabilidade do teste
const generate = function () {
  return crypto.randomBytes(5).toString('hex');
};
//não é responsabilidade do teste
const request = function (url, method, data) {
  return axios({ url, method, data });
};

test('Should get posts', async function () {

  const newUser1 = await professionalsService.saveProfessional({
    name: generate(),
    surname: generate(),
    birthdate: '10-10-1010',
    cpf: generate(),
    email: generate(),
    phone: generate(),
    profession: 'PSICOLOGA',
    professional_document: generate(),
    username: generate(),
    password: generate()
  });
  const newUser2 = await professionalsService.saveProfessional({
    name: generate(),
    surname: generate(),
    birthdate: '10-10-1010',
    cpf: generate(),
    email: generate(),
    phone: generate(),
    profession: 'PSICOLOGA',
    professional_document: generate(),
    username: generate(),
    password: generate()
  });
  const newUser3 = await professionalsService.saveProfessional({
    name: generate(),
    surname: generate(),
    birthdate: '10-10-1010',
    cpf: generate(),
    email: generate(),
    phone: generate(),
    profession: 'PSICOLOGA',
    professional_document: generate(),
    username: generate(),
    password: generate()
  });

  const response = await request('http://localhost:3333/api/professionals', 'get');

  const professionals = response.data;
  expect(professionals).toHaveLength(3);
  await professionalsService.deleteProfessional(newUser1.id);
  await professionalsService.deleteProfessional(newUser2.id);
  await professionalsService.deleteProfessional(newUser3.id);
});

test('Should save posts', async function () {

  const data = {
    name: generate(),
    surname: generate(),
    birthdate: '10-10-1010',
    cpf: generate(),
    email: generate(),
    phone: generate(),
    profession: 'PSICOLOGA',
    professional_document: generate(),
    username: generate(),
    password: generate()
  };


  const response = await request('http://localhost:3333/api/professionals', 'post', data);

  const professional = response.data;

  expect(professional.name).toBe(data.name);
  expect(professional.surname).toBe(data.surname);
  await professionalsService.deleteProfessional(professional.id);
});

test('Should update posts', async function () {
  const professional = await professionalsService.saveProfessional({
    name: generate(),
    surname: generate(),
    birthdate: '10-10-1010',
    cpf: generate(),
    email: generate(),
    phone: generate(),
    profession: 'PSICOLOGA',
    professional_document: generate(),
    username: generate(),
    password: generate()
  });
  professional.name = generate();
  professional.surname = generate();

  await request(`http://localhost:3333/api/professional/${professional.id}`, 'put', professional);

  const updatedProfessional = await professionalsService.getProfessional(professional.id);

  expect(updatedProfessional.name).toBe(professional.name);
  expect(updatedProfessional.surname).toBe(professional.surname);
  await professionalsService.deleteProfessional(professional.id);
});

test('Should delete posts', async function () {
  const professional = await professionalsService.saveProfessional({
    name: generate(),
    surname: generate(),
    birthdate: '10-10-1010',
    cpf: generate(),
    email: generate(),
    phone: generate(),
    profession: 'PSICOLOGA',
    professional_document: generate(),
    username: generate(),
    password: generate()
  });

  await request(`http://localhost:3333/api/professional/${professional.id}`, 'delete');
  const professionals = await professionalsService.getProfessionals();
  expect(professionals).toHaveLength(0);
});