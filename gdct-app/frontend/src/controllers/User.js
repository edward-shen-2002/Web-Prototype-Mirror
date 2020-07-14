import axios from 'axios'

const UserController = (() => {
  const UserAxios = axios.create({
    baseURL: 'http://localhost:3000/auth/',
    withCredentials: true,
  })
  return {
    login: async (data) =>
      UserAxios.post('/login', { ...data }).then((res) => {
        console.log(res)
        //res.data
      }),
    signup: async (data) =>
      UserAxios.post('/register', { ...data }).then((res) => {
        console.log(res.data)
      }),
    logout: async (data) => UserAxios.get('/logout').then((res) => res.data),
    google: async (data) => UserAxios.get('/google').then((res) => res.data),
    facebook: async (data) =>
      UserAxios.get('/facebook').then((res) => res.data),
    profile: async () => UserAxios.get('/profile').then((res) => res.data),
  }
})()

export default UserController
