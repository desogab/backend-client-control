import {app} from '../../app'
import request from 'supertest'

describe('POST - /professional - create new professional', () => {
  // O profissional deve ser criado
  // O retorno deve ser 200 - OK
  // Deve retornar um objeto com todos os campos preenchidos do profissional
  it('Should be create a new professional', async () => {
    const response = await request(app).post('/api/professional').send({
      
    })
  })

  // O profissional não pode ser criado
  // O retorno deve ser 400 - Bad request
  // A mensagem deve ser 'User already exists'

  it('Should return user already exists', async () => {
    const response = await request(app).post('/api/professional').send({
      
    })
  })

  // Deve identificar campos inválidos
  // O status deve ser 400 - Bad Request
  // deve retornar a mensagem 'Field is invalid'
  it('Should have invalid field', async () => {
    const response = await request(app).post('/api/professional').send({
      
    })
  })
})
