import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function isAuth (req: Request, res:Response, next:NextFunction) {
  const authToken = req.headers.authorization

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const token = authToken && authToken.split(' ')[1]

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!token) {
    return res.status(401).json({
      message: 'Token is missing'
    })
  }

  try {
    verify(token, process.env.JWT_KEY as string)
    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Token invalid'
    })
  }
}
