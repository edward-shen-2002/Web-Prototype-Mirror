import axios from 'axios'

import { host } from '../constants/domain'

const COAGroupController = (() => {
  const COAGroupAxios = axios.create({
    baseURL: `${host}/COA_manager/COAGroups`,
  })
  return {
    fetch: async (query) =>
      COAGroupAxios.get('/fetchCategoryGroup').then((res) => res.data.COAGroups),
    create: async (COAGroup) =>
      COAGroupAxios.post('/createCategoryGroup', { COAGroup }).then((res) => res.data.COAGroup),
    delete: async (_id) => COAGroupAxios.delete(`/deleteCategoryGroup/${_id}`),
    update: async (COAGroup) =>
      COAGroupAxios.put(`/updateCategoryGroup/${COAGroup._id}`, { COAGroup }),
  }
})()

export default COAGroupController
