import axios from 'axios'

const userController = (() => {
  const userAxios = axios.create({
    baseURL: 'http://localhost:3000/user',
  })
  return {
    create: async (user) =>
      userAxios.post(`/createUser`, user).then((res) => res.data.user),
  }
})()

export default userController