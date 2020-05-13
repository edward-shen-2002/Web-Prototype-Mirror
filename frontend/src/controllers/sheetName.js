import axios from 'axios'

const sheetNameController = (
  () => {
    const sheetNameAxios = axios.create({ baseURL: 'http://localhost:3000/sheetNames' })
    return {
      fetchSheetNames: async (query) => sheetNameAxios.get('').then((res) => res.data.sheetNames),
      createSheetName: async (sheetName) => sheetNameAxios.post('', { sheetName }).then((res) => res.data.sheetName),
      deleteSheetName: async (_id) => sheetNameAxios.delete(`/${_id}`),
      updateSheetName: async (sheetName) => sheetNameAxios.put(`/${sheetName._id}`, { sheetName })
    }
  }
)()

export default sheetNameController