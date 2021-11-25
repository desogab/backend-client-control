const axios = require('../services/axios');
const clientsService = require('../services/clientsService');
const generate = require('../data/utils/generateRandomData');
//professional_id = 26, para atrelar aos clientes durante
// o teste;
test.only('Should save client', async function () {
  //TODO: criar uma variavel com os dados que quero salvar
  const data = {
    active: '',
    sponsor: '',
    name: '',
    surname: '',
    birthdate: '',
    cpf: '',
    email: '',
    phone: '',
    consultation_price: '',
    professional_id: 26,
    street: '',
    district: '',
    number: 01,
    city: '',
    complement: '',
    state: '',
    zipcode: '',
    emergency_name: '',
    emergency_surname: '',
    emergency_phone: '',
    sponsor_name: '',
    sponsor_surname: '',
    sponsor_cpf: ''
  };
  //TODO: crio um POST request para enviar esses dados através
  // das rotas http para o banco de dados.
  const response = await axios.requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  );
  //TODO: Devo esperar que o retorno seja 200. expect;
  expect(response.status).toBe(201);
  //TODO: armazeno a response do POST e faço a extração
  // de .data
  const client = response.data;

  //TODO: verifico se a data inicial bate com a resposta
  // da API através do expect/toBe
  expect(...client).toBe(...data);
  //TODO: deleto o post;
  await clientsService.deleteClient(client.id);
});
