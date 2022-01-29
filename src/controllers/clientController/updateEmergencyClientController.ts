import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../database/prismaClient'

export const updateEmergencyClient = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { ...data }: Prisma.ClientEmergencyUpdateInput = req.body
  try {
    await prisma.clientEmergency.update({
      where: {
        clientId: id
      },
      data: {
        ...data
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
