import crypto from 'crypto'

export const RandomHexString = () => {
  return crypto.randomBytes(5).toString('hex')
}

export const RandomDateTime = () => {
  const date = new Date()
  return date
}

export const RandomProfession = () => {
  const selectProfession = [
    'PSICOLOGO',
    'PSICOLOGA',
    'NUTRICIONISTA',
    'DENTISTA'
  ]
  const getRandomProfession = selectProfession[Math.floor(Math.random() * selectProfession.length)]
  return getRandomProfession
}
