const clientsData = require('../data/clientsData');

exports.getClients = function () {
  return clientsData.getClients();
};

exports.getClient = async function (id) {
  const client = await clientsData.getClient(id);
  if (!client) throw new Error('Client not found');
  return client;
};

exports.saveClient = async function (client) {
  const existingClient = await clientsData.getClientByCPF(client.cpf);
  if (existingClient) throw new Error('Client already exists');
  return clientsData.saveClient(client);
};

exports.updateClient = async function (professionalId, id, client) {
  await exports.getClient(id);
  return clientsData.updateClient(professionalId, id, client);
};

exports.deleteClient = function (id) {
  return clientsData.deleteClient(id);
};
