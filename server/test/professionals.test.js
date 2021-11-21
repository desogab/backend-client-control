const axios = require('axios');
const crypto = require('crypto');
const professionalsService = require('../services/professionalsService')

const generate = function () {
  return crypto.randomBytes(20).toString('hex');
}

test('Should get posts', async function () {
  //given - dado que
  professionalsService.saveProfessionals({})
  professionalsService.saveProfessionals({})
  professionalsService.saveProfessionals({})
  //when - quando acontecer
  const response = await axios({
    url: 'http://localhost:3333/api/professionals',
    method: 'GET',
  });
  const professionals = response.data;
  //then - então

});