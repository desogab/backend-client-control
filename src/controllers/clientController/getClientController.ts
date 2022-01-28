import { NextFunction, Request, Response } from 'express'
import { prisma } from 'src/database/prismaClient'

export const getClient = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const client = await prisma.client.findUnique({
      where: {
        id
      },
      include: {
        clientAddress: true,
        clientEmergency: true,
        consultationInfo: true,
        clientSponsor: true
      }
    })
    res.status(200).json(client)
  } catch (error) {
    next(error)
  }
}
