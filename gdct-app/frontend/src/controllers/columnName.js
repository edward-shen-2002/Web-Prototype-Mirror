import axios from 'axios'

const columnNameController = (() => {
  const columnNameAxios = axios.create({
    baseURL: 'http://localhost:3000/columnNames',
  })
  return {
    fetch: async (query) =>
      columnNameAxios.get('').then((res) => res.data.columnNames),
    create: async (columnName) =>
      columnNameAxios
        .post('', { columnName })
        .then((res) => res.data.columnName),
    delete: async (_id) => columnNameAxios.delete(`/${_id}`),
    update: async (columnName) =>
      columnNameAxios.put(`/${columnName._id}`, { columnName }),
  }
})()

export default columnNameController
