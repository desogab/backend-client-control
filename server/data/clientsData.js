const db = require('../infra/database');

exports.saveClient = async function (client) {
  return await db.txIf(async function (t) {
    const newClient = await t.one(
      'WITH new_client AS (INSERT INTO client(active, sponsor, name, surname, birthdate, cpf, email, phone, consultation_price, professional_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id), new_address AS (INSERT INTO client_address(street, district, number, city, complement, state, zipcode, client_id) VALUES ($11,$12,$13,$14,$15,$16,$17,(SELECT id FROM new_client)) RETURNING client_id), new_emergency AS (INSERT INTO client_emergency (name, surname, phone, client_id) VALUES ($18, $19, $20, (SELECT client_id FROM new_address))RETURNING client_id) INSERT INTO client_sponsor (name, surname, cpf, client_id) VALUES ($21, $22, $23, (SELECT client_id FROM new_emergency)) RETURNING client_id',
      [
        client.active,
        client.sponsor,
        client.name,
        client.surname,
        client.birthdate,
        client.cpf,
        client.email,
        client.phone,
        client.consultation_price,
        client.professional_id,
        client.street,
        client.district,
        client.number,
        client.city,
        client.complement,
        client.state,
        client.zipcode,
        client.emergency_name,
        client.emergency_surname,
        client.emergency_phone,
        client.sponsor_name,
        client.sponsor_surname,
        client.sponsor_cpf,
      ]
    );
    return t.one('select * from client where id = $1', [newClient.client_id]);
  });
};

exports.getClients = function () {
  return db.query('select * from client');
};

exports.getClient = function (id) {
  return db.oneOrNone('select * from client where id = $1', [id]);
};

exports.deleteClient = function (id) {
  return db.none('delete from client where id = $1', [id]);
};
