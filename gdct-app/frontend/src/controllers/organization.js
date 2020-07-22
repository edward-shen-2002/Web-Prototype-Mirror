import axios from 'axios'

import { host } from '../constants/domain'

const organizationController = (() => {
  const orgAxios = axios.create({
    baseURL: `${host}/org_manager/organizations`,
  })
  return {
    fetchOrg: async (_id) =>
      orgAxios.get(`/${_id}`).then((res) => res.data.Org),
    fetch: async () => orgAxios.get('').then((res) => res.data.Orgs),
    create: async (Org) =>
      orgAxios.post('', { Org }).then((res) => res.data.Org),
    delete: async (_id) => orgAxios.delete(`/${_id}`),
    update: async (Org) => orgAxios.put(`/${Org._id}`, { Org }),
    fetchByOrgGroupId: async (_id) =>
      orgAxios
        .get(`/searchOrganization/${_id}`)
        .then((res) => res.data.organization),
  }
})()

export default organizationController
