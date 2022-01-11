import express, { Request, Response, NextFunction } from 'express'
import jwt from 'express-jwt'
import professionalRoute from './routes/professionalsRoute'
import clientsRoute from './routes/clientsRoute'
import auth from './routes/auth'

const app = express()

app.use(express.json())
// app.use(
//   '/',
//   jwt({
//     secret: process.env.JWT_SECRET as string,
//     algorithms: ['HS256']
//   }).unless({
//     path: ['/api/auth']
//   })
// )

app.use(professionalRoute)
app.use(clientsRoute)
// app.use(auth)

app.use((
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.message === 'Already exists!') {
    return res.status(409).send(error.message)
  }
  if (error.message === 'Not found') {
    return res.status(404).send(error.message)
  }
  res.status(500).send(error.message)
})

const PORT = 3333

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`)
})
