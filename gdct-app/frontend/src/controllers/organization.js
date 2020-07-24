import axios from 'axios';

const orgController = (() => {
  const orgAxios = axios.create({
    baseURL: 'http://localhost:3000/organizations',
  });
  return {
    fetchOrg: async _id => orgAxios.get(`/${_id}`).then(res => res.data.Org),
    fetch: async () => orgAxios.get('').then(res => res.data.Orgs),
    create: async Org => orgAxios.post('', { Org }).then(res => res.data.Org),
    delete: async _id => orgAxios.delete(`/${_id}`),
    update: async Org => orgAxios.put(`/${Org._id}`, { Org }),
    fetchByOrgGroupId: async _id =>
      orgAxios.get(`/searchOrganization/${_id}`).then(res => res.data.Org),
  };
})();

export default orgController;
