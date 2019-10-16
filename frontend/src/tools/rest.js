import axios from "axios";

// TODO: Change local domain to work with production!!

const localhost = "http://localhost:3000";

export const publicAxios = axios.create({ baseURL: `${localhost}/public` });

export const authAxios = axios.create({ baseURL: `${localhost}/jwt` });

export const adminUserRoleAxios = axios.create({ baseURL: `${localhost}/admin/user_manager` });

const _setAxiosToken = (routeAxios, token) => routeAxios.defaults.headers.common = { ...routeAxios.defaults.headers.common, Authorization: `Bearer ${token}` };

// Token is the same for all requests - for a registered user
export const setAxiosToken = (token) => {
  _setAxiosToken(authAxios, token);
  _setAxiosToken(adminUserRoleAxios, token);
};

const _isAxiostokenSet = (routeAxios) => typeof routeAxios.defaults.headers.common.Authorization !== "undefined";

export const isAxiosTokenSet = () =>  _isAxiostokenSet(authAxios) && _isAxiostokenSet(adminUserRoleAxios);

const _unsafeDeleteAxiosToken = (routeAxios) => delete routeAxios.defaults.headers.common.Authorization;

export const deleteAxiosToken = () => {
  if(isAxiosTokenSet()) {
    _unsafeDeleteAxiosToken(authAxios);
    _unsafeDeleteAxiosToken(adminUserRoleAxios);
  }
};