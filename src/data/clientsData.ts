import { IClient } from 'src/@types/client'
import { IProfessionalInfo } from 'src/@types/professional'
import db from '../infra/database'

export const saveDataClient = async (client: IClient) => await db.txIf(async (t) => {
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
      client.consultationPrice,
      client.professionalId,
      client.street,
      client.district,
      client.number,
      client.city,
      client.complement,
      client.state,
      client.zipcode,
      client.emergencyName,
      client.emergencySurname,
      client.emergencyPhone,
      client.sponsorName,
      client.sponsorSurname,
      client.sponsorCpf
    ]
  )
  client.id = newClient.client_id
  return client
})

export const getDataClients = () => db.query('select * from client')

export const getDataClient = (id: IClient['id']) => db.oneOrNone('select * from client where id = $1', [id])

export const getDataClientByCPF = (cpf: IClient['cpf']) => db.oneOrNone('select cpf from client where cpf = $1', [cpf])

export const updateDataClient = (professionalId: IProfessionalInfo['professionalId'], id: IClient['id'], client: IClient) => db.none(
  'update client set active=$3, sponsor=$4, name=$5, surname=$6, birthdate=$7, cpf=$8, email=$9, phone=$10, consultation_price=$11, professional_id=$2 where id =$1;update client_address set street=$12, district=$13, number=$14, city=$15, complement=$16, state=$17, zipcode=$18 where client_id =$1; update client_emergency set name=$19, surname=$20, phone=$21 where client_id =$1; update client_sponsor set name=$22, surname=$23 where client_id =$1;',
  [
    id,
    professionalId,
    client.active,
    client.sponsor,
    client.name,
    client.surname,
    client.birthdate,
    client.cpf,
    client.email,
    client.phone,
    client.consultationPrice,
    client.street,
    client.district,
    client.number,
    client.city,
    client.complement,
    client.state,
    client.zipcode,
    client.emergencyName,
    client.emergencySurname,
    client.emergencyPhone,
    client.sponsorName,
    client.sponsorSurname,
    client.sponsorCpf
  ]
)

export const deleteDataClient = (id: IClient['id']) => db.none('delete from client where id = $1', [id])
