import { Router } from 'express'
import { isAuth } from '../middleware/isAuth'
import { login } from '../controllers/professionalController/loginProfessionalController'
import { getProfessional } from '../controllers/professionalController/getProfessionalController'
import { createProfessional } from '../controllers/professionalController/createProfessionalController'
import { updateProfessional } from '../controllers/professionalController/updateProfessionalController'

const router = Router()

router.post('/api/login', login)

router.post('/api/professional', createProfessional)

router.get('/api/professional/:id', isAuth, getProfessional)

router.put('/api/professional/:id', isAuth, updateProfessional)

export default router
