import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../database/prismaClient'

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    await prisma.client.delete({
      where: {
        id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
