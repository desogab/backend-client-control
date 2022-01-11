import { RandomDateTime, RandomHexString, RandomProfession } from './generateRandomData'
import { saveDataProfessional } from '../../data/professionalsData'
import { saveDataClient } from '../../data/clientsData'

export const saveProfessionalOnDB = () => {
  const professional = saveDataProfessional({
    name: RandomHexString(),
    surname: RandomHexString(),
    birthdate: RandomDateTime(),
    cpf: RandomHexString(),
    email: RandomHexString(),
    phone: RandomHexString(),
    profession: RandomProfession(),
    professionalDocument: RandomHexString(),
    username: RandomHexString(),
    password: RandomHexString()
  })
  return professional
}

export const saveProfessionalData = () => {
  const professional = {
    name: RandomHexString(),
    surname: RandomHexString(),
    birthdate: RandomDateTime(),
    cpf: RandomHexString(),
    email: RandomHexString(),
    phone: RandomHexString(),
    profession: RandomProfession(),
    professionalDocument: RandomHexString(),
    username: RandomHexString(),
    password: RandomHexString()
  }
  return professional
}

export const saveClientOnDB = (professionalId: string) => {
  const client = saveDataClient({
    active: true,
    sponsor: true,
    name: RandomHexString(),
    surname: RandomHexString(),
    birthdate: RandomDateTime(),
    cpf: RandomHexString(),
    email: RandomHexString(),
    phone: RandomHexString(),
    consultationPrice: 200,
    professionalId: professionalId,
    street: RandomHexString(),
    district: RandomHexString(),
    number: 12,
    city: RandomHexString(),
    complement: RandomHexString(),
    state: 'RJ',
    zipcode: RandomHexString(),
    emergencyName: RandomHexString(),
    emergencySurname: RandomHexString(),
    emergencyPhone: RandomHexString(),
    sponsorName: RandomHexString(),
    sponsorSurname: RandomHexString(),
    sponsorCpf: RandomHexString()
  })
  return client
}
// consultation_price e state estão de forma estática
export const saveClientData = (professionalId: string) => {
  const client = {
    active: true,
    sponsor: true,
    name: RandomHexString(),
    surname: RandomHexString(),
    birthdate: RandomDateTime(),
    cpf: RandomHexString(),
    email: RandomHexString(),
    phone: RandomHexString(),
    consultationPrice: 200,
    professionalId: professionalId,
    street: RandomHexString(),
    district: RandomHexString(),
    number: 12,
    city: RandomHexString(),
    complement: RandomHexString(),
    state: 'RJ',
    zipcode: RandomHexString(),
    emergencyName: RandomHexString(),
    emergencySurname: RandomHexString(),
    emergencyPhone: RandomHexString(),
    sponsorName: RandomHexString(),
    sponsorSurname: RandomHexString(),
    sponsorCpf: RandomHexString()
  }
  return client
}
