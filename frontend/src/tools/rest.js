import axios from "axios";

const SERVER_LOCAL = "http://localhost:3000";

const SERVER_APP = process.env.NODE_ENV === "production" ? process.env.SERVER_URL : SERVER_LOCAL;

export const publicAxios = axios.create({ baseURL: `${SERVER_APP}/public` });

export const authAxios = axios.create({ baseURL: `${SERVER_APP}/jwt` });

export const adminUserRoleAxios = axios.create({ baseURL: `${SERVER_APP}/admin/user_manager` });
export const adminOrganizationRoleAxios = axios.create({ baseURL: `${SERVER_APP}/admin/organization_manager` });

const _setAxiosToken = (routeAxios, token) => routeAxios.defaults.headers.common = { ...routeAxios.defaults.headers.common, Authorization: `Bearer ${token}` };

// Token is the same for all requests - representation of an authenticated registered user
export const setAxiosToken = (token) => {
  _setAxiosToken(authAxios, token);
  _setAxiosToken(adminUserRoleAxios, token);
  _setAxiosToken(adminOrganizationRoleAxios, token);
};

const _isAxiostokenSet = (routeAxios) => typeof routeAxios.defaults.headers.common.Authorization !== "undefined";

export const isAxiosTokenSet = () =>  _isAxiostokenSet(authAxios) && _isAxiostokenSet(adminUserRoleAxios) && _isAxiostokenSet(adminOrganizationRoleAxios);

const _unsafeDeleteAxiosToken = (routeAxios) => delete routeAxios.defaults.headers.common.Authorization;

export const deleteAxiosToken = () => {
  if(isAxiosTokenSet()) {
    _unsafeDeleteAxiosToken(authAxios);
    _unsafeDeleteAxiosToken(adminUserRoleAxios);
    _unsafeDeleteAxiosToken(adminOrganizationRoleAxios);
  }
};