import axios from 'axios'

const workflowController = (() => {
  const workflowAxios = axios.create({
    baseURL: 'http://localhost:3000/workflow_manager/workflows',
  })
  return {
    fetch: async (_id) => new Promise(() => (
      {
        initialState: '101',
        finalStates: [ '102', '103' ],
        currentState: undefined,
        stateHistory: [],
        statesIdMap: {
          '101': { name: 'Presubmit', to: '102' /**, appSysRoles: [] */ },
          '102': { name: 'Submit', to: '103' },
          '103': { name: 'Review', to: [ '102', '104' ] },
          '104': { name: 'Approved' },
          '105': { name: 'Rejected' }
        }
      }
    ))
      // workflowAxios.get(`/${_id}`).then((res) => res.data.workflow),
    // fetchWorkflows: async (query) =>
    //   workflowAxios.get('').then((res) => res.data.workflows),
    // createWorkflow: async (workflow) =>
    //   workflowAxios.post('', { workflow }).then((res) => res.data.workflow),
    // deleteWorkflow: async (_id) => workflowAxios.delete(`/${_id}`),
    // updateWorkflow: async (workflow) =>
    //   workflowAxios.put(`/${workflow._id}`, { workflow }),
  }
})()

export default workflowController
