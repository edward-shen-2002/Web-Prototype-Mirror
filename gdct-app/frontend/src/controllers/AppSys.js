import axios from 'axios'

const AppSysController = (() => {
  const AppSysAxios = axios.create({
    baseURL: 'http://localhost:3000/appsys_manager/appsyses',
  })
  return {
    fetchAppSys: async (_id) =>
      AppSysAxios.get(`/${_id}`).then((res) => res.data.AppSys),
    fetch: async (_) => AppSysAxios.get('/searchAllAppSyses').then((res) => res.data.AppSyses),
    create: async (AppSys) =>
      AppSysAxios.post('', { AppSys }).then((res) => res.data.AppSys),
    delete: async (_id) => AppSysAxios.delete(`/${_id}`),
    update: async (AppSys) => AppSysAxios.put(`/${AppSys._id}`, { AppSys }),
  }
})()

export default AppSysController
