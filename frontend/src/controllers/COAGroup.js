import axios from 'axios'

const COAGroupController = (() => {
  const COAGroupAxios = axios.create({
    baseURL: 'http://localhost:3000/COA_manager/COAGroups',
  })
  return {
    fetchCOAGroup: async (_id) =>
      COAGroupAxios.get(`/${_id}`).then((res) => res.data.COAGroup),
    fetchCOAGroups: async (query) =>
      COAGroupAxios.get('').then((res) => res.data.COAGroups),
    createCOAGroup: async (COAGroup) =>
      COAGroupAxios.post('', { COAGroup }).then((res) => res.data.COAGroup),
    deleteCOAGroup: async (_id) => COAGroupAxios.delete(`/${_id}`),
    updateCOAGroup: async (COAGroup) =>
      COAGroupAxios.put(`/${COAGroup._id}`, { COAGroup }),
  }
})()

export default COAGroupController
