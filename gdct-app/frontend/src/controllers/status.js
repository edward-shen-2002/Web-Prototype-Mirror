import axios from 'axios'

import { host } from '../constants/domain'

const statusController = (() => {
  const statusAxios = axios.create({
    baseURL: `${host}/designer/statuses`,
  })
  return {
    fetch: async (query) =>
      statusAxios.get('/fetchStatuses').then((res) => res.data.statuses),
    create: async (status) =>
      statusAxios.post('/createStatus', { status }).then((res) => res.data.status),
    delete: async (_id) => statusAxios.delete(`/deleteStatus/${_id}`),
    update: async (status) =>
      statusAxios.put(`/updateStatus/${status._id}`, { status }),
  }
})()

export default statusController
