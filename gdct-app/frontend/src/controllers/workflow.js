import axios from 'axios'

import { host } from '../constants/domain'

const workflowController = (() => {
  const workflowAxios = axios.create({
    baseURL: `${host}/workflow_manager/workflows`,
  })
  return {
    // fetchWorkflows: async (query) =>
    //   workflowAxios.get('').then((res) => res.data.workflows),
    create: async (workflowData) =>
      workflowAxios
        .post('/createWorkflow', { data: workflowData })
        .then((res) => res.data.workflow),
    delete: async (_id) => workflowAxios.delete(`/deleteWorkflow/${_id}`),
    update: async (workflowData) =>
      workflowAxios.put(`/updateWorkflow/${workflowData.workflow._id}`, {
        data: workflowData,
      }),
    fetch: async () =>
      workflowAxios.get('/fetchWorkflow').then((res) => {
        return res.data.data
      }),
    fetchById: async (workflowId) =>
      workflowAxios.get(`/fetchWorkflow/${workflowId}`).then((res) => {
        return res.data.data
      }),
    fetchProcess: async (processId) =>
      workflowAxios
        .get(`/fetchByWorkflowProcessId/${processId}`)
        .then((res) => res.data.data),
  }
})()

export default workflowController
