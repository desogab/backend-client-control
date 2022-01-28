import express, { Request, Response, NextFunction } from 'express'
import professionalRoute from './routes/professionalsRoute'
import clientsRoute from './routes/clientsRoute'

const app = express()

app.use(express.json())

app.use(professionalRoute)
app.use(clientsRoute)

app.use((
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.message === 'Already exists') {
    return res.status(409).json({ message: `${error.message}` })
  }
  if (error.message === 'Not found') {
    return res.status(404).json({ message: `${error.message}` })
  }
  if (error.message === 'Bad Request') {
    return res.status(400).json({ message: `${error.message}` })
  }
  res.status(500).json({ message: `${error.message}` })
})

export { app }
