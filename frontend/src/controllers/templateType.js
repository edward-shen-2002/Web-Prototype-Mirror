import axios from 'axios'

const templateTypeController = (() => {
  const templateTypeAxios = axios.create({
    baseURL: 'http://localhost:3000/template_manager/templateTypes',
  })
  return {
    fetchTemplateTypes: async (query) =>
      templateTypeAxios.get('').then((res) => res.data.templateTypes),
    createTemplateType: async (templateType) =>
      templateTypeAxios
        .post('', {
          templateType: {
            ...templateType,
            programIds: [],
          },
        })
        .then((res) => res.data.templateType),
    deleteTemplateType: async (_id) => templateTypeAxios.delete(`/${_id}`),
    updateTemplateType: async (templateType) =>
      templateTypeAxios.put(`/${templateType._id}`, { templateType }),
  }
})()

export default templateTypeController
