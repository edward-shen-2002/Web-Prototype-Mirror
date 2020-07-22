import axios from 'axios'

import { host } from '../constants/domain'

const templatePackageController = (() => {
  const templatePackageAxios = axios.create({
    baseURL: `${host}/template_manager/templatePackages`,
  })
  return {
    fetchPopulated: async (_id) =>
      templatePackageAxios
        .get(`/fetchPopulatedTemplatePackage/${_id}`)
        .then((res) => res.data.templatePackage),
    fetchTemplatePackage: async (_id) =>
      templatePackageAxios
        .get(`/fetchTemplatePackage/${_id}`)
        .then((res) => res.data.templatePackage),
    fetch: async (_) =>
      templatePackageAxios
        .get('/fetchTemplatePackage')
        .then((res) => res.data.templatePackages),
    create: async (templatePackage) =>
      templatePackageAxios
        .post('/createTemplatePackage', { templatePackage })
        .then((res) => res.data.templatePackage),
    delete: async (_id) => templatePackageAxios.delete(`/deleteTemplatePackage/${_id}`),
    update: async (templatePackage) =>
      templatePackageAxios.put(`/updateTemplatePackage/${templatePackage._id}`, {
        templatePackage,
      }),
    updatePopulated: async (templatePackage) =>
      templatePackageAxios
        .put(`/updatePopulatedTemplatePackage/${templatePackage._id}`, { templatePackage })
        .then((res) => {
          return [res.data.templatePackage]
        }),
  }
})()

export default templatePackageController
