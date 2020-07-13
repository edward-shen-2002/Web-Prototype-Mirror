import axios from 'axios'

const organizationController = (() => {
  const organizationAxios = axios.create({
    baseURL: 'http://localhost:3000/organization_manager/organization',
  })
  return {
    fetchByOrgGroupId: async (_id) =>
      organizationAxios
        .get(`/searchOrganization/${_id}`)
        .then((res) => res.data.organization),
  }
})()

export default organizationController
