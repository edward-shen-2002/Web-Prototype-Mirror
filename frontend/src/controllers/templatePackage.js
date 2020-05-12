import axios from 'axios'

const templatePackageController = (
  () => {
    const templateAxios = axios.create({ baseURL: 'http://localhost:3000/template_manager/templatePackages' })
    return {
      fetchTemplatePackage: async (_id) => templateAxios.get(`/${_id}`).then((res) => res.data.templatePackage),
      fetchTemplatePackages: async (query) => templateAxios.get('').then((res) => res.data.templatePackages),
      createTemplatePackage: async (templatePackage) => templateAxios.post('', { templatePackage }).then((res) => res.data.templatePackage),
      deleteTemplatePackage: async (_id) => templateAxios.delete(`/${_id}`),
      updateTemplatePackage: async (templatePackage) => templateAxios.put(`/${templatePackage._id}`, { templatePackage })
    }
  }
)()

export default templatePackageController