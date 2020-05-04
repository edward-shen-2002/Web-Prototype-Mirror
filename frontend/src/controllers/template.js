import axios from 'axios'

const templateController = (
  () => {
    const templateAxios = axios.create({ baseURL: 'http://localhost:3000/designer/templates' })
    return {
      fetchTemplate: async (_id) => templateAxios.get(`/${_id}`).then((res) => res.data.template),
      fetchTemplates: async (query) => templateAxios.get('').then((res) => res.data.templates),
      createTemplate: async (template) => templateAxios.post('', { template }).then((res) => res.data.template),
      deleteTemplate: async (_id) => templateAxios.delete(`/${_id}`),
      updateTemplate: async (template) => templateAxios.put(`/${template._id}`, { template })
    }
  }
)()

export default templateController