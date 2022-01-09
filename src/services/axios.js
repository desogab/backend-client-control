const axios = require('axios');

const request = (url, method, data) => axios({ url, method, data });

// O objetivo desta função é para ser usada nos testes para que
// o desenvolvedor tenha o controle da tratativa dos erros
// durante os requests;
const requestWhitoutValidateStatus = (url, method, data, headers = {}) => axios({
  url,
  method,
  data,
  headers,
  validateStatus: () => false,
});

export { request, requestWhitoutValidateStatus };
