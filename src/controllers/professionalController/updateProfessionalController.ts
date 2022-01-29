import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../database/prismaClient'

export const updateProfessional = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { ...data } = req.body
  try {
    await prisma.professionalUser.update({
      where: {
        id: id
      },
      data: {
        ProfessionalInfo: {
          update: {
            ...data
          }
        }
      }
    }
    )
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
