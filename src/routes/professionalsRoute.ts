import { Router } from 'express'
import { isAuth } from 'src/middleware/isAuth'
import { login } from 'src/controllers/professionalController/loginProfessionalController'
import { getProfessional } from 'src/controllers/professionalController/getProfessionalController'
import { createProfessional } from 'src/controllers/professionalController/createProfessionalController'
import { updateProfessional } from 'src/controllers/professionalController/updateProfessionalController'

const router = Router()

router.post('/api/login', login)

router.post('/api/professional', createProfessional)

router.get('/api/professional/:id', isAuth, getProfessional)

router.put('/api/professional/:id', isAuth, updateProfessional)

export default router
