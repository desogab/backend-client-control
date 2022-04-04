import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const token = authToken && authToken.split(' ')[1]

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'Token is missing'
    })
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string, function (err) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Token inválido.' });
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Token invalid'
    })
  }
}
