import axios from 'axios'

const COAController = (
  () => {
    const COAAxios = axios.create({ baseURL: 'http://localhost:3000/COA_manager/COAs' })
    return {
      fetchCOA: async (_id) => COAAxios.get(`/${_id}`).then((res) => res.data.COA),
      fetchCOAs: async (query) => COAAxios.get('').then((res) => res.data.COAs),
      createCOA: async (COA) => COAAxios.post('', { COA }).then((res) => res.data.COA),
      deleteCOA: async (_id) => COAAxios.delete(`/${_id}`),
      updateCOA: async (COA) => COAAxios.put(`/${COA._id}`, { COA })
    }
  }
)()

export default COAController