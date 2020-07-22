import axios from 'axios'

import { host } from '../constants/domain'

const COAController = (() => {
  const COAAxios = axios.create({
    baseURL: `${host}/COA_manager/categories`,
  })
  return {
    fetchCOA: async (_id) =>
      COAAxios.get(`/fetchCategory/${_id}`).then((res) => res.data.COA),
    fetch: async () => COAAxios.get('/fetchCategories').then((res) => res.data.COAs),
    create: async (COA) =>
      COAAxios.post('/createCategory', { COA }).then((res) => res.data.COA),
    delete: async (_id) => COAAxios.delete(`/deleteCategory/${_id}`),
    update: async (COA) => COAAxios.put(`/updateCategory/${COA._id}`, { COA }),
  }
})()

export default COAController
