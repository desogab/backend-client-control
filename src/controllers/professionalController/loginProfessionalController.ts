import { prisma } from '../../database/prismaClient'
import { compare } from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

export const login = async (req: Request, res: Response, next: NextFunction) => {
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

    const token = sign({
      id: alreadyExist.id,
      username: alreadyExist.username
    }, process.env.JWT_SECRET as string, {
      algorithm: 'HS256',
      expiresIn: '6h',
    })

    res.status(200).json({ auth: true, token })
  } catch (error) {
    next(error)
  }
}
