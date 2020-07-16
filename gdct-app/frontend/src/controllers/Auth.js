import axios from 'axios'

const AuthController = (() => {
  const AuthAxios = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
  })
  return {
    login: async (data) =>
      AuthAxios.get(
        `/auth/local/callback?email=${data.email}&password=${data.password}`
      ),
    auto: async (data) => AuthAxios.get('/auto'),
  }
})()

export default AuthController
