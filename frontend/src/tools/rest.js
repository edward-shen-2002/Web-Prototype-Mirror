import axios from "axios";

import { 
  SERVER_APP, 
  REST_GROUP_PUBLIC, 
  REST_GROUP_AUTH, 
  REST_GROUP_ADMIN_USER, 
  REST_GROUP_ADMIN_ORGANIZATION, 
  REST_GROUP_VERIFICATION, 
  REST_GROUP_ADMIN_SECTOR, 
  REST_GROUP_ADMIN_TEMPLATE,
  REST_GROUP_ADMIN_BUNDLE
} from "constants/rest";

export const publicAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_PUBLIC}` });

export const authAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_AUTH}` });

export const verificationAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_VERIFICATION}` });

export const adminUserRoleAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_ADMIN_USER}` });
export const adminOrganizationRoleAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_ADMIN_ORGANIZATION}` });
export const adminSectorRoleAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_ADMIN_SECTOR}` });
export const adminTemplateRoleAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_ADMIN_TEMPLATE}` });
export const adminBundleRoleAxios = axios.create({ baseURL: `${SERVER_APP}${REST_GROUP_ADMIN_BUNDLE}` });

const _setAxiosToken = (routeAxios, token) => routeAxios.defaults.headers.common = { ...routeAxios.defaults.headers.common, Authorization: `Bearer ${token}` };

const tokenAxiosList = [ 
  authAxios, 
  adminUserRoleAxios, 
  adminOrganizationRoleAxios, 
  adminSectorRoleAxios, 
  adminTemplateRoleAxios 
];

// Token is the same for all requests - representation of an authenticated registered user
export const setAxiosToken = (token) => tokenAxiosList.forEach((routeAxios) => _setAxiosToken(routeAxios, token));

const _isAxiostokenSet = (routeAxios) => typeof routeAxios.defaults.headers.common.Authorization !== "undefined";

export const isAxiosTokenSet = () =>  tokenAxiosList.reduce((accumulator, routeAxios) => accumulator && _isAxiostokenSet(routeAxios), true);

const _unsafeDeleteAxiosToken = (routeAxios) => delete routeAxios.defaults.headers.common.Authorization;

export const deleteAxiosToken = () => {
  if(isAxiosTokenSet()) tokenAxiosList.forEach((routeAxios) => _unsafeDeleteAxiosToken(routeAxios));
};