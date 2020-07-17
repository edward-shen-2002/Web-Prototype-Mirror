import axios from 'axios'

import { host } from '../constants/domain'

const organizationController = (() => {
  const organizationAxios = axios.create({
    baseURL: host + '/organization',
  })
  return {
    fetchByOrgGroupId: async (_id) =>
      organizationAxios.get(`/searchOrganization/${_id}`).then((res) => res.data.organization),
  }
})()

export default organizationController