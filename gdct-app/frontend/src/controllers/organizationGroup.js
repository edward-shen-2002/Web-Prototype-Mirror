import axios from 'axios'

const organizationGroupController = (() => {
  const organizationGroupAxios = axios.create({
    baseURL: 'http://localhost:3000/orgGroup_manager/orgGroups',
  })
  return {
    fetch: async (_id) =>
      organizationGroupAxios
        .get(`/searchAllOrgGroups`)
        .then((res) => res.data.organizationGroup),
  }
})()

export default organizationGroupController
