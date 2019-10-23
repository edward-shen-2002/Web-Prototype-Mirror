const PORT = 3000;
export const SERVER_LOCAL = `http://localhost:${PORT}`;

/* Route groups and routes - separated by auth or security */
export const REST_GROUP_PUBLIC = "/public";
export const REST_LOGIN = "/login";
export const REST_REGISTER = "/register";

export const REST_GROUP_AUTH = "/jwt";
export const REST_RECONNECT = "/reconnect";
export const REST_LOGOUT = "/logout";

export const REST_GROUP_ADMIN = "/admin";

export const REST_GROUP_ADMIN_USER = `${REST_GROUP_ADMIN}/user_manager`;
export const REST_ADMIN_USERS = "/users";

export const REST_GROUP_ADMIN_DATA = `${REST_GROUP_ADMIN}/data_manager`;
export const REST_ADMIN_DATAGROUPS = "/data_groups";

export const REST_GROUP_ADMIN_ORGANIZATION = `${REST_GROUP_ADMIN}/organization_manager`;

// HTTP error codes
export const HTTP_ERROR_INVALID_TOKEN = 401;
export const HTTP_ERROR_UNAUTHORIZED = 403;