import { Router, Request, Response, NextFunction } from 'express'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from 'src/database/prismaClient'
import { isAuth } from 'src/middleware/isAuth'
import { Prisma } from '@prisma/client'

const router = Router()

router.post(
  '/api/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    try {
      const alreadyExist = await prisma.professionalUser.findFirst({
        where: {
          username
        }
      })

      if (!alreadyExist) {
        throw new Error('Invalid credentials!')
      }

      const passwordMatch = await compare(password, alreadyExist.password)

      if (!passwordMatch) {
        throw new Error('Invalid credentials!')
      }

      const token = sign({ id: alreadyExist.id }, process.env.JWT_KEY as string, {
        algorithm: 'HS256',
        expiresIn: '1h'
      })

      res.status(200).json({ auth: true, token })
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/api/professional/:id',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
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
)

router.post(
  '/api/professional',
  async (req: Request, res: Response, next: NextFunction) => {
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
)

router.put(
  '/api/professional/:id',
  isAuth,
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
