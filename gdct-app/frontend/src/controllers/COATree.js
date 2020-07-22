import axios from 'axios'

import { host } from '../constants/domain'

const COATreeController = (() => {
  const COATreeAxios = axios.create({
    baseURL: `${host}/COA_manager/COATrees`,
  })
  return {
    fetchCOATree: async (_id) =>
      COATreeAxios.get(`/findCategoryTree/${_id}`).then((res) => res.data.COATree),
    fetchBySheetName: async (_id) =>
      COATreeAxios.get(`/findCategoryTree/sheetName/${_id}`).then((res) => res.data.COATrees),
    fetch: async () =>
      COATreeAxios.get('/findCategoryTrees').then((res) => res.data.COATrees),
    create: async (COATree) =>
      COATreeAxios.post('/createCategory', { COATree }).then((res) => res.data.COATree),
    delete: async (_id) => COATreeAxios.delete(`/${_id}`),
    update: async (COATree) => COATreeAxios.put(`/updateCategoryTree/${COATree._id}`, { COATree }),
    updateBySheetName: async (COATrees, sheetNameId) =>
      COATreeAxios.put(`/updateCategoryTree/sheetName/${sheetNameId}`, { COATrees }),
  }
})()

export default COATreeController
