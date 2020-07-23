import axios from 'axios';

const programController = (() => {
  const programAxios = axios.create({
    baseURL: 'http://localhost:3000/programs',
  });
  return {
    fetch: async query => programAxios.get('').then(res => res.data.programs),
    create: async program => programAxios.post('', { program }).then(res => res.data.program),
    delete: async _id => programAxios.delete(`/${_id}`),
    update: async program => programAxios.put(`/${program._id}`, { program }),
  };
})();

export default programController;
