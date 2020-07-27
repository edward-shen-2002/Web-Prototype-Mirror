import axios from 'axios';
import { host } from '../constants/domain'

import { host } from '../constants/domain';

const orgController = (() => {
  const orgAxios = axios.create({
    baseURL: `${host}/organizations`,
    withCredentials: true,
  });
  return {
    fetchOrg: async _id => orgAxios.get(`/${_id}/get`).then(res => res.data.Org),
    fetch: async () => orgAxios.get('/get').then(res => res.data.Orgs),
    create: async Org => orgAxios.post('/create', { Org }).then(res => res.data.Org),
    delete: async _id => orgAxios.delete(`/${_id}/delete`),
    update: async Org => orgAxios.put(`/${Org._id}/update`, { Org }),
    fetchByOrgGroupId: async _id =>
      orgAxios.get(`/searchOrganization/${_id}`).then(res => res.data.Org),
  };
})();

export default orgController;
