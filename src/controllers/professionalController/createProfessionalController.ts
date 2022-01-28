import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import { prisma } from 'src/database/prismaClient'

export const createProfessional = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: Prisma.ProfessionalUserCreateInput = req.body
  const { name, surname, cpf, birthdate, email, phone, profession, professionalDocument }: Prisma.ProfessionalInfoCreateInput = req.body
  try {
    const passwordHash = await hash(password, 8)
    const user = await prisma.professionalUser.create({
      data: {
        username,
        password: passwordHash,
        ProfessionalInfo: {
          create: {
            name,
            surname,
            cpf,
            birthdate: new Date(birthdate),
            email,
            phone,
            profession,
            professionalDocument
          }
        }
      }
    })
    res.status(200).json(user)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(400).json({
          name: error.name,
          message: 'user already exists',
          target: error.meta
        })
      } if (error.code === 'P2009') {
        res.status(400).json({
          name: error.name,
          message: 'invalid field',
          target: error.meta
        })
      }
    } else {
      res.status(400).json({
        message: 'something went wrong, try again.'
      })
    }
  }
}
