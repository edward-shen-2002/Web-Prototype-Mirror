import axios from 'axios';

import { host } from '../constants/domain';

const userController = (() => {
  const userAxios = axios.create({
    baseURL: host + '/user',
  });
  return {
    create: async user => userAxios.post(`/createUser`, user).then(res => res.data.user),
  };
})();

export default userController;
