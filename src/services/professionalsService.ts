import { IProfessionalInfo, IProfessionalUser } from 'src/@types/professional'
import { deleteDataProfessional, getDataProfessional, getDataProfessionalByTitle, getDataProfessionals, saveDataProfessional, updateDataProfessional } from '../data/professionalsData'

export const getProfessionals = () => getDataProfessionals()

export const getProfessional = async (id: IProfessionalUser['id']) => {
  const professional = await getDataProfessional(id)
  if (professional === '') throw new Error('Professional not found')
  return professional
}

export const saveProfessional = async (professional: IProfessionalUser) => {
  const existingProfessional: IProfessionalUser['cpf'] = await getDataProfessionalByTitle(
    professional.cpf
  )
  if (existingProfessional !== null) throw new Error('Professional already exists')

  return saveDataProfessional(professional)
}

export const deleteProfessional = (id:string) => deleteDataProfessional(id)

export const updateProfessional = async (id:IProfessionalInfo['professionalId'], professional:IProfessionalInfo) => {
  await getProfessional(id)
  return await updateDataProfessional(id, professional)
}
