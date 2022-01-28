import { Prisma } from '@prisma/client'
import {
  Router, Request, Response, NextFunction
} from 'express'
import { isAuth } from 'src/middleware/isAuth'
import { prisma } from '../database/prismaClient'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

interface TokenJWT {
  id: string;
  iat?: string;
  exp?: string;
}

const router = Router()

router.get(
  '/api/clients',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
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
)

router.get(
  '/api/client/:id',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
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
)

router.post(
  '/api/client',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    const decodeJWT: TokenJWT = jwt_decode(token as string)
    const professionalId = decodeJWT.id

    const {
      name,
      surname,
      cpf,
      birthdate,
      email,
      phone,
      consultationPrice,
      sponsor,
      zipcode,
      street,
      number,
      complement,
      district,
      city,
      state,
      emergencyName,
      emergencyPhone,
      emergencySurname,
      sponsorName,
      sponsorSurname,
      sponsorCpf
    } = req.body
    try {
      const client = await prisma.client.create({
        data: {
          name,
          surname,
          cpf,
          birthdate: new Date(birthdate),
          email,
          phone,
          consultationPrice,
          sponsor,
          professionalId: professionalId,
          clientAddress: {
            create: {
              zipcode,
              street,
              number,
              complement,
              district,
              city,
              state
            }
          },
          clientEmergency: {
            create: {
              name: emergencyName,
              phone: emergencyPhone,
              surname: emergencySurname
            }
          },
          clientSponsor: {
            create: {
              name: sponsorName,
              surname: sponsorSurname,
              cpf: sponsorCpf
            }
          }
        }
      })
      res.status(201).json({ message: 'created', id: client.id })
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

router.put(
  '/api/client/:id',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const { ...data }:Prisma.ClientUpdateInput = req.body

    try {
      await prisma.client.update({
        where: {
          id
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
)

router.put('/api/client/:id/address',
  isAuth,
  async (req:Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { ...data }: Prisma.ClientAddressUpdateInput = req.body
    try {
      await prisma.clientAddress.update({
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
  })

router.put('/api/client/:id/emergency',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
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
  })

router.put('/api/client/:id/sponsor',
  isAuth,
  async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params
    const { ...data }:Prisma.ClientSponsorUpdateInput = req.body
    try {
      await prisma.clientSponsor.update({
        where: {
          clientId: id
        },
        data: {
          ...data
        }
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(error)
      }
      next(error)
    }
  })

router.delete(
  '/api/client/:id',
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
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
)

export default router
