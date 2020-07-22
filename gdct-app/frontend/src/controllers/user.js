import axios from 'axios'

import { host } from '../constants/domain'
// console.log(host)

const UserController = (() => {
  const UserAxios = axios.create({
    baseURL: `${host}/public`,
    withCredentials: true,
  })

  return {
    login: async (data) =>
      UserAxios.post('/login', { ...data }).then((res) => res.data),
    signup: async (data) =>
      UserAxios.post('/register', { ...data }).then((res) => {
        console.log(res.data)
      }),
    profile: async () => UserAxios.get('/profile').then((res) => res.data),
  }
})()

export default UserController
