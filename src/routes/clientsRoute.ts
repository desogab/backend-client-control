import {
  Router, Request, Response, NextFunction
} from 'express'
import { getClient, getClients, saveClient, deleteClient, updateClient } from '../services/clientsService'

const router = Router()

router.get(
  '/api/client',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clients = await getClients()
      res.status(200).json(clients)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/api/client/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.id
    try {
      const client = await getClient(clientId)
      res.status(200).json(client)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/api/client',
  async (req: Request, res: Response, next: NextFunction) => {
    const client = req.body
    try {
      const createNewClient = await saveClient(client)
      res.status(201).json(createNewClient)
    } catch (error) {
      next(error)
    }
  }
)

router.put(
  '/api/client/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.id
    const client = req.body
    try {
      await updateClient(professionalId, clientId, client)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/api/client/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.id
    try {
      await deleteClient(clientId)
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
)

export default router
