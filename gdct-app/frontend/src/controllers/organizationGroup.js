import axios from 'axios';

const organizationGroupController = (() => {
  const organizationGroupAxios = axios.create({
    baseURL: 'http://localhost:3000/organizationGroup',
  });
  return {
    fetch: async _id =>
      organizationGroupAxios
        .get(`/searchOrganizationGroup`)
        .then(res => res.data.organizationGroup),
  };
})();

export default organizationGroupController;
