const axios = require('axios');

exports.request = function (url, method, data) {
  return axios({ url, method, data });
};

//O objetivo desta função é para ser usada nos testes para que
// o desenvolvedor tenha o controle da tratativa dos erros
// durante os requests;
exports.requestWhitoutValidateStatus = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};
