import axios from 'axios'

const templateTypeController = (
  () => {
    const templateTypeAxios = axios.create({ baseURL: 'http://localhost:3000/root/templates' })
    return {
      fetchTemplate: async (_id) => templateTypeAxios.get(`/${_id}`).then((res) => res.data.template),
      fetchTemplates: async (query) => templateTypeAxios.get('').then((res) => res.data.templates),
      createTemplate: async (template) => templateTypeAxios.post('', { template }).then((res) => res.data.template),
      deleteTemplate: async (_id) => templateTypeAxios.delete(`/${_id}`),
      updateTemplate: async (template) => templateTypeAxios.put(`/${template._id}`, { template })
    }
  }
)()

export default templateTypeController