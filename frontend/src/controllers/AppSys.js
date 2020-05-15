import axios from 'axios'

const AppSysController = (
  () => {
    const AppSysAxios = axios.create({ baseURL: 'http://localhost:3000/appsys_manager/appsyses' })
    return {
      fetchAppSys: async (_id) => AppSysAxios.get(`/${_id}`).then((res) => res.data.AppSys),
      fetchAppSyses: async (_) => AppSysAxios.get('').then((res) => res.data.AppSyses),
      createAppSys: async (AppSys) => AppSysAxios.post('', { AppSys }).then((res) => res.data.AppSys),
      deleteAppSys: async (_id) => AppSysAxios.delete(`/${_id}`),
      updateAppSys: async (AppSys) => AppSysAxios.put(`/${AppSys._id}`, { AppSys })
    }
  }
)()

export default AppSysController