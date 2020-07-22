import axios from 'axios'

import { host } from '../constants/domain'

const sheetNameController = (() => {
  const sheetNameAxios = axios.create({
    baseURL: `${host}/sheetNames`,
  })
  return {
    fetch: async (query) =>
      sheetNameAxios.get('/fetchSheetNames').then((res) => res.data.sheetNames),
    create: async (sheetName) =>
      sheetNameAxios
        .post('/createSheetName', { sheetName })
        .then((res) => res.data.sheetName),
    delete: async (_id) => sheetNameAxios.delete(`/deleteSheetName/${_id}`),
    update: async (sheetName) =>
      sheetNameAxios.put(`/updateSheetName/${sheetName._id}`, { sheetName }),
  }
})()

export default sheetNameController
