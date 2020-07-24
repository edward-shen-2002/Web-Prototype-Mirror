import axios from 'axios'

const usersController = (() => {
  const usersAxios = axios.create({
    baseURL: 'http://localhost:3000/users',
  })
  return {
    fetch: async (query) =>
    usersAxios.get('/getUserInfo', query).then((res) => res.data.users),
    create: async (user) =>
    usersAxios.post('', { user }).then((res) => res.data.user),
    delete: async (_id) => usersAxios.delete(`/${_id}`),
    update: async (user) =>
    usersAxios.put(`/updateUserInfo/${user._id}`, { user }),
  }
})()

export default usersController
