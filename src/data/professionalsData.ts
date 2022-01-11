import { IProfessionalInfo, IProfessionalUser } from 'src/@types/professional'
import db from '../infra/database'

export const getDataProfessionals = () => db.query('select * from professional_user')

export const getDataProfessional = (id:IProfessionalInfo['professionalId']) => db.oneOrNone('select * from professional_info where id = $1', [id])
export const getDataProfessionalByTitle = (username:IProfessionalUser['username']) => db.oneOrNone('select * from professional_user where username = $1', [
  username
])

export const saveDataProfessional = (professional:IProfessionalUser) => db.one(
  'with new_professional_user as (insert into professional_user(username, password)values($1, $2)returning *) insert into professional_info(name, surname, birthdate, cpf, email, phone, profession, professional_document, user_id) values ($3, $4, $5, $6, $7, $8, $9, $10,(select id from new_professional_user)) returning *',
  [
    professional.username,
    professional.password,
    professional.name,
    professional.surname,
    professional.birthdate,
    professional.cpf,
    professional.email,
    professional.phone,
    professional.profession,
    professional.professionalDocument
  ]
)

export const deleteDataProfessional = (id:IProfessionalUser['id']) => db.none('delete from professional_user where id = $1', [id])

export const updateDataProfessional = (id:IProfessionalInfo['professionalId'], professional:IProfessionalInfo) => db.none(
  'update professional_info set name=$1, surname=$2, birthdate=$3, cpf=$4, email=$5, phone=$6, profession=$7, professional_document=$8 where id = $9',
  [
    professional.name,
    professional.surname,
    professional.birthdate,
    professional.cpf,
    professional.email,
    professional.phone,
    professional.profession,
    professional.professionalDocument,
    id
  ]
)
