import axios from 'axios';

const workflowController = (() => {
  const workflowAxios = axios.create({
    baseURL: 'http://localhost:3000/workflow_manager/workflows',
  });
  return {
    // fetchWorkflows: async (query) =>
    //   workflowAxios.get('').then((res) => res.data.workflows),
    create: async workflowData =>
      workflowAxios.post('', { data: workflowData }).then(res => res.data.workflow),
    delete: async _id => workflowAxios.delete(`/${_id}`),
    update: async workflowData =>
      workflowAxios.put(`/${workflowData.workflow._id}`, { data: workflowData }),
    fetch: async () => workflowAxios.get('').then(res => res.data.data),
    fetchById: async workflowId =>
      workflowAxios.get(`/${workflowId}`).then(res => {
        return res.data.data;
      }),
  };
})();

export default workflowController;
