import { IClient } from 'src/@types/client'
import { IProfessionalInfo } from 'src/@types/professional'
import {
  deleteDataClient, getDataClient, getDataClientByCPF, getDataClients, saveDataClient, updateDataClient
} from '../data/clientsData'

export const getClients = () => getDataClients()

export const getClient = async (id:IClient['id']) => {
  const client: IClient = await getDataClient(id)
  if (client.id === null) throw new Error('Client not found')
  return client
}

export const saveClient = async (client: IClient) => {
  const existingClient: string = await getDataClientByCPF(client.cpf)
  if (existingClient !== null) throw new Error('Client already exists')
  return await saveDataClient(client)
}

export const updateClient = async (professionalId: IProfessionalInfo['professionalId'], id: IClient['id'], client: IClient) => {
  await getDataClient(id)
  return updateDataClient(professionalId, id, client)
}

export const deleteClient = (id:IClient['id']) => deleteDataClient(id)
