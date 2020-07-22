import axios from 'axios'

import { host } from '../constants/domain'

const templateController = (() => {
  const templateAxios = axios.create({
    baseURL: `${host}/template_manager/templates`,
  })
  return {
    fetchTemplate: async (_id) =>
      templateAxios.get(`/fetchTemplate/${_id}`).then((res) => res.data.template),
    fetch: async (query) =>
      templateAxios.get('/fetchTemplate').then((res) => res.data.templates),
    create: async (template) =>
      templateAxios.post('/createTemplate', { template }).then((res) => res.data.template),
    delete: async (_id) => templateAxios.delete(`/deleteTemplate/${_id}`),
    update: async (template) =>
      templateAxios.put(`/updateTemplate/${template._id}`, { template }),
    updateTemplateWorkflowProcess: async (_id, workflowProcessId) =>
      templateAxios.put(`/updateTemplate/${_id}/workflowProcess/${workflowProcessId}`),
  }
})()

export default templateController
