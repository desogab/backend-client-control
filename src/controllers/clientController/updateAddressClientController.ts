import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../database/prismaClient'

export const updateAddressClient = async (req:Request, res: Response, next: NextFunction) => {
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
}
