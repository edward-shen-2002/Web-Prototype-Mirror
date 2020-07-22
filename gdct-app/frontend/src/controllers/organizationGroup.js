import axios from 'axios'

import { host } from '../constants/domain'

const organizationGroupController = (() => {
  const organizationGroupAxios = axios.create({
    baseURL: `${host}/orgGroup_manager/orgGroups`,
  })
  return {
    fetch: async (_id) =>
      organizationGroupAxios
        .get(`/searchAllOrgGroups`)
        .then((res) => res.data.organizationGroup),
  }
})()

export default organizationGroupController
