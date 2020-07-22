import axios from 'axios'

import { host } from '../constants/domain'

const columnNameController = (() => {
  const columnNameAxios = axios.create({
    baseURL: `${host}/columnNames`,
  })
  return {
    fetch: async (query) =>
      columnNameAxios.get('/fetchColumnNames').then((res) => res.data.columnNames),
    create: async (columnName) =>
      columnNameAxios
        .post('/createColumnName', { columnName })
        .then((res) => res.data.columnName),
    delete: async (_id) => columnNameAxios.delete(`/deleteColumnName/${_id}`),
    update: async (columnName) =>
      columnNameAxios.put(`/updateColumnName${columnName._id}`, { columnName }),
  }
})()

export default columnNameController
