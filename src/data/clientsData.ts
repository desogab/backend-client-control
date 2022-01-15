import { IClient } from 'src/@types/client'
import { IProfessionalInfo } from 'src/@types/professional'
import db from '../infra/database'

export const saveDataClient = async (client: IClient) => {
  return await db.tx(async t => {
    return await t.one(
      'insert into client(active, sponsor, name, surname, birthdate, cpf, email, phone, consultation_price, professional_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *', [
        client.active,
        client.sponsor,
        client.name,
        client.surname,
        client.birthdate,
        client.cpf,
        client.email,
        client.phone,
        client.consultationPrice,
        client.professionalId
      ]).then(response => {
      return t.batch([
        t.one('insert into client_address(street, district, number, city, complement, state,      zipcode, client_id) values ($1, $2, $3, $4, $5, $6, $7, $8) returning id', [
          client.street,
          client.district,
          client.number,
          client.city,
          client.complement,
          client.state,
          client.zipcode,
          response.id
        ]),
        t.none('insert into client_emergency (name, surname, phone, client_id) values ($1, $2, $3, $4)',
          [
            client.emergencyName,
            client.emergencySurname,
            client.emergencyPhone,
            response.id
          ]
        ),
        t.none('insert into client_sponsor (name, surname, cpf, client_id) values ($1, $2, $3, $4)', [
          client.sponsorName,
          client.sponsorSurname,
          client.sponsorCpf,
          response.id
        ]),
        t.one('select c.*, ca.*, ce."name" as emergencyName, ce.surname as emergencySurname, ce.phone as emergencyPhone, cs."name" as sponsorName, cs.surname as sponsorSurname, cs.cpf as sponsorCpf from client c inner join client_address ca on c.id = ca.client_id inner join client_emergency ce on ca.client_id = ce.client_id inner join client_sponsor cs on ca.client_id = cs.client_id where c.id = $1;', [response.id])
      ])
    })
  }).then(data => {
    return data.at(-1)
  })
}

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
