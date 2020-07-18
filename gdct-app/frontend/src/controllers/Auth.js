import axios from 'axios'

const AuthController = (() => {
  const AuthAxios = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
  })
  return {
    login: async (data) =>
      AuthAxios.post('/login', data)
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    auto: async (data) => AuthAxios.get('/auto'),
    profile: async () => AuthAxios.get('/profile').then((res) => res.data),
  }
})()

export default AuthController
