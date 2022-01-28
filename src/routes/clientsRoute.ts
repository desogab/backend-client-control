import { Router } from 'express'
import { isAuth } from 'src/middleware/isAuth'
import { getAllClients } from 'src/controllers/clientController/getAllClientController'
import { getClient } from 'src/controllers/clientController/getClientController'
import { createClient } from 'src/controllers/clientController/createClientController'
import { updateClient } from 'src/controllers/clientController/updateClientController'
import { updateAddressClient } from 'src/controllers/clientController/updateAddressClientController'
import { updateEmergencyClient } from 'src/controllers/clientController/updateEmergencyClientController'
import { updateSponsorClient } from 'src/controllers/clientController/updateSponsorClientController'
import { deleteClient } from 'src/controllers/clientController/deleteClientController'

const router = Router()

// All client routes need to be auth

router.get('/api/clients', isAuth, getAllClients)

router.get('/api/client/:id', isAuth, getClient)

router.post('/api/client', isAuth, createClient)

router.put('/api/client/:id', isAuth, updateClient)

router.put('/api/client/:id/address', isAuth, updateAddressClient)

router.put('/api/client/:id/emergency', isAuth, updateEmergencyClient)

router.put('/api/client/:id/sponsor', isAuth, updateSponsorClient)

router.delete('/api/client/:id', isAuth, deleteClient)

export default router
