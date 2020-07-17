import axios from 'axios'

import { host } from '../constants/domain'

const organizationGroupController = (() => {
  const organizationGroupAxios = axios.create({
    baseURL: host + '/organizationGroup',
  })
  return {
    fetch: async (_id) =>
      organizationGroupAxios.get(`/searchOrganizationGroup`).then((res) => res.data.organizationGroup),
  }
})()

export default organizationGroupController