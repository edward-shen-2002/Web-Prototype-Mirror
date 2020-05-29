import axios from 'axios'

const templateTypeController = (() => {
  const templateTypeAxios = axios.create({
    baseURL: 'http://localhost:3000/template_manager/templateTypes',
  })
  return {
    fetch: async (query) =>
      templateTypeAxios.get('').then((res) => res.data.templateTypes),
    create: async (templateType) =>
      templateTypeAxios
        .post('', {
          templateType: {
            ...templateType,
            programIds: [],
          },
        })
        .then((res) => res.data.templateType),
    delete: async (_id) => templateTypeAxios.delete(`/${_id}`),
    update: async (templateType) =>
      templateTypeAxios.put(`/${templateType._id}`, { templateType }),
  }
})()

export default templateTypeController
