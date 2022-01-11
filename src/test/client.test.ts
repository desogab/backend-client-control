import { requestWhitoutValidateStatus } from '../services/axios'
import { deleteClient, getClient, getClients, saveClient, updateClient } from '../services/clientsService'
import { deleteProfessional, getProfessional, getProfessionals, saveProfessional, updateProfessional } from '../services/professionalsService'
import { RandomHexString } from './utils/generateRandomData'
import { saveClientData, saveClientOnDB, saveProfessionalData, saveProfessionalOnDB } from './utils/generateProfessionalAndClient'
import { IClient } from 'src/@types/client'
import { IProfessionalUser } from 'src/@types/professional'
import { AxiosResponse } from 'axios'

test('Shoud get clients', async () => {
  const newProfessional = saveProfessionalData()

  const responseProfessional = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional
  )
  // verificar a criação do profissional 201
  const professional = responseProfessional.data

  // criar um cliente atrelando o professional_id ao id do profissional
  const professionalId:Ipro = professional.id

  const clientOne = await saveClientOnDB(
    professionalId
  )

  const clientTwo = await saveClientOnDB(
    professionalId
  )

  const responseClient = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'get'
  )
  expect(responseClient.status).toBe(200)

  const client = responseClient.data

  expect(client).toHaveLength(2)
  await deleteProfessional(professionalId)
  await deleteClient(clientOne.id)
  await deleteClient(clientTwo.id)
})

test('Should get client', async () => {
  // criar um client
  const newProfessional = saveProfessionalData()

  const responseProfessional = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    newProfessional
  )

  const professional = responseProfessional.data

  const professionalId = professional.id

  const data = saveClientData(professionalId)

  const client = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  )
  expect(client.status).toBe(201)

  const clientId = client.data.id

  const responseClient = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/client/${clientId}`,
    'get'
  )
  expect(responseClient.status).toBe(200)
  await deleteClient(clientId)
  await deleteProfessional(professionalId)
})

test('Should save client', async () => {
  const professional = await saveProfessionalOnDB()

  const responseProfessional = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get'
  )

  expect(responseProfessional.status).toBe(200)

  const professionalId = responseProfessional.data.id

  const data = saveClientData(professionalId)

  const response = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  )

  expect(response.status).toBe(201)

  const client = response.data

  await deleteClient(client.client_id)
  await deleteProfessional(professionalId)
})

test('Shoud update client', async () => {
  const professional = saveProfessionalData()
  const createProfessional = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/professional',
    'post',
    professional
  )

  const responseProfessional = createProfessional.data
  const professionalId = responseProfessional.id

  const client = await saveClientOnDB(
    professionalId
  )

  client.name = RandomHexString()
  client.surname = RandomHexString()

  const response = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/client/${client.id}`,
    'put',
    client,
    { 'X-Professional-ID': professionalId }
  )

  expect(response.status).toBe(204)

  const updateClient = await getClient(client.id)
  expect(updateClient.name).toBe(client.name)
  expect(updateClient.surname).toBe(client.surname)
  await deleteProfessional(responseProfessional.id)
  await deleteClient(client.id)
})

// test('Shoud not update client', async function () {});

test('Should not save', async () => {
  const professional = await saveProfessionalOnDB()

  const responseProfessional = await requestWhitoutValidateStatus(
    `http://localhost:3333/api/professional/${professional.id}`,
    'get'
  )

  expect(responseProfessional.status).toBe(200)

  const professionalId = responseProfessional.data.id

  const data = saveClientData(professionalId)

  const responseClientOne = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  )

  const responseClientTwo = await requestWhitoutValidateStatus(
    'http://localhost:3333/api/client',
    'post',
    data
  )

  expect(responseClientOne.status).toBe(201)
  expect(responseClientTwo.status).toBe(500)

  const client = responseClientOne.data

  await deleteClient(client.client_id)
  await deleteProfessional(professionalId)
})
