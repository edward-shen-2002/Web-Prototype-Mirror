import axios from 'axios';

const statusController = (() => {
  const statusAxios = axios.create({
    baseURL: 'http://localhost:3000/designer/statuses',
  });
  return {
    fetch: async query => statusAxios.get('').then(res => res.data.statuses),
    create: async status => statusAxios.post('', { status }).then(res => res.data.status),
    delete: async _id => statusAxios.delete(`/${_id}`),
    update: async status => statusAxios.put(`/${status._id}`, { status }),
  };
})();

export default statusController;
