const clientsData = require('../data/clientsData');

exports.saveClient = function (client) {
  return clientsData.saveClient(client);
};

exports.deleteClient = function (id) {
  return clientsData.deleteClient(id);
};
