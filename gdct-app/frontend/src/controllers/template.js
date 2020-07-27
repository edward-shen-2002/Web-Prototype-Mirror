import axios from 'axios';

const templateController = (() => {
  const templateAxios = axios.create({
    baseURL: 'http://localhost:3000/template_manager/templates',
  });
  return {
    fetchTemplate: async _id => templateAxios.get(`/${_id}`).then(res => res.data.template),
    fetch: async query => templateAxios.get('').then(res => res.data.templates),
    create: async template => templateAxios.post('', { template }).then(res => res.data.template),
    delete: async _id => templateAxios.delete(`/${_id}`),
    update: async template => templateAxios.put(`/${template._id}`, { template }),
  };
})();

export default templateController;
