import {
  Router, Request, Response, NextFunction
} from 'express'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcryptjs'
import authProfessional from '../data/authData'

const router = Router()

interface User {
  username: string;
  password: string;
}

router.post(
  '/api/auth',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: User = req.body
    const passwordHash: string = await hash(password, 8)

    const id: string = await authProfessional(username, passwordHash)

    if (!id) {
      res.status(401).json({ message: 'Ai não da, tenta de novo!' })
    }

    const token = sign({ id }, process.env.JWT_SECRET as string, {
      subject: id,
      expiresIn: 300 // expires in 5min
    })

    return res.json({ auth: true, token })
  }
)

export default router
