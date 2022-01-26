import { Router, Request, Response, NextFunction } from 'express'
import { hash } from 'bcryptjs'
import { prisma } from 'src/database/prismaClient'
import { Prisma } from '@prisma/client'

const router = Router()

router.get(
  '/api/professional/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
      const professional = await prisma.professionalUser.findUnique({
        where: {
          id: id
        },
        include: {
          ProfessionalInfo: true
        }
      })
      res.status(200).json(professional)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/api/professional',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, name, surname, cpf, birthdate, email, phone, profession, professionalDocument } = req.body
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
            message: 'user already exists'
          })
        } if (error.code === 'P2009') {
          res.status(400).json({
            name: error.name,
            message: 'invalid field'
          })
        }
      } else {
        res.status(400).json({
          message: 'something went wrong, try again.'
        })
      }
    }
  }
)

router.patch(
  '/api/professional/:id',
  async (req: Request, res: Response, next: NextFunction) => {
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
)

export default router
