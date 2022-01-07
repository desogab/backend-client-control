const clientsData = require('../data/clientsData');

exports.getClients = function () {
  return clientsData.getClients();
};

exports.getClient = function (id) {
  return clientsData.getClient(id);
};

exports.saveClient = function (client) {
  return clientsData.saveClient(client);
};

exports.deleteClient = function (id) {
  return clientsData.deleteClient(id);
};
