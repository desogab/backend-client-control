import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../database/prismaClient'

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
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
