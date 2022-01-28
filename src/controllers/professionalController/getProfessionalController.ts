import { NextFunction, Request, Response } from 'express'
import { prisma } from 'src/database/prismaClient'

export const getProfessional = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const professional = await prisma.professionalUser.findUnique({
      where: {
        id: id
      },
      include: {
        ProfessionalInfo: true,
        client: true,
        consultationInfo: true
      }
    })
    res.status(200).json(professional)
  } catch (error) {
    next(error)
  }
}
