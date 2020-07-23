import axios from 'axios';

import { host } from '../constants/domain';

const organizationGroupController = (() => {
  const organizationGroupAxios = axios.create({
    baseURL: `${host}/orgGroups`,
  });
  return {
    fetch: async () =>
      organizationGroupAxios
        .get(`/searchOrganizationGroup`)
        .then(res => res.data.organizationGroup),
  };
})();

export default organizationGroupController;
