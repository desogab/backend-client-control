import { Prisma } from '@prisma/client'
import { prisma } from 'src/database/prismaClient'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { NextFunction, Request, Response } from 'express'
interface TokenJWT {
  id: string;
  iat?: string;
  exp?: string;
}
export const createClient = async (req: Request, res: Response, next: NextFunction) => {
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
