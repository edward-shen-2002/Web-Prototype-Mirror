import axios from 'axios'

const COATreeController = (
  () => {
    const COATreeAxios = axios.create({ baseURL: 'http://localhost:3000/COA_manager/COATrees' })
    return {
      fetchCOATree: async (_id) => COATreeAxios.get(`/${_id}`).then((res) => res.data.COATree),
      fetchCOATrees: async (query) => COATreeAxios.get('').then((res) => res.data.COATrees),
      createCOATree: async (COATree) => COATreeAxios.post('', { COATree }).then((res) => res.data.COATree),
      deleteCOATree: async (_id) => COATreeAxios.delete(`/${_id}`),
      updateCOATree: async (COATree) => COATreeAxios.put(`/${COATree._id}`, { COATree })
    }
  }
)()

export default COATreeController