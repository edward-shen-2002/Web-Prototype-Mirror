import axios from 'axios'

const COAController = (() => {
  const COAAxios = axios.create({
    baseURL: 'http://localhost:3000/COA_manager/COAs',
  })
  return {
    fetchCOA: async (_id) =>
      COAAxios.get(`/${_id}`).then((res) => res.data.COA),
    fetch: async () => COAAxios.get('').then((res) => res.data.COAs),
    create: async (COA) =>
      COAAxios.post('', { COA }).then((res) => res.data.COA),
    delete: async (_id) => COAAxios.delete(`/${_id}`),
    update: async (COA) => COAAxios.put(`/${COA._id}`, { COA }),
  }
})()

export default COAController