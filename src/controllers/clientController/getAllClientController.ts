import {
  Router, Request, Response, NextFunction
} from 'express'
import { prisma } from '../../database/prismaClient'

export const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        clientAddress: true,
        clientEmergency: true,
        consultationInfo: true,
        clientSponsor: true
      }
    })
    res.status(200).json(clients)
  } catch (error) {
    next(error)
  }
}
