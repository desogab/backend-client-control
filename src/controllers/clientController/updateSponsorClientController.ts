import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../database/prismaClient'

export const updateSponsorClient = async (req:Request, res:Response, next:NextFunction) => {
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
    res.status(204).end()
  } catch (error) {
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.log(error)
    }
    next(error)
  }
}
