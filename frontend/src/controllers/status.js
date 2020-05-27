import axios from 'axios'

const statusController = (() => {
  const statusAxios = axios.create({
    baseURL: 'http://localhost:3000/designer/statuses',
  })
  return {
    fetchStatuses: async (query) =>
      statusAxios.get('').then((res) => res.data.statuses),
    createStatus: async (status) =>
      statusAxios.post('', { status }).then((res) => res.data.status),
    deleteStatus: async (_id) => statusAxios.delete(`/${_id}`),
    updateStatus: async (status) =>
      statusAxios.put(`/${status._id}`, { status }),
  }
})()

export default statusController
