import axios, { AxiosRequestHeaders, Method } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = (url?: string, method?: Method, data?: any) => axios({ url, method, data })

// O objetivo desta função é para ser usada nos testes para que
// o desenvolvedor tenha o controle da tratativa dos erros
// durante os requests;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestWhitoutValidateStatus = (url: string, method: Method, data?: any, headers?: AxiosRequestHeaders) => axios({
  url,
  method,
  data,
  headers,
  validateStatus: () => false
})

export { request, requestWhitoutValidateStatus }
