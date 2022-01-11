import db from '../infra/database'
import { IProfessionalUser } from 'src/@types/professional'
export const authProfessional = (username:IProfessionalUser['username'], password:IProfessionalUser['password']) => db.oneOrNone(
  'select pi2.id from professional_info pi2 join professional_user pu on pi2.user_id = pu.id where pu.username = $1 and pu."password" = $2',
  [username, password]
)

export default authProfessional
