const PORT = 3000;
const BACKEND_LOCAL = `http://localhost:${PORT}`;

export const SERVER_APP = process.env.NODE_ENV === "production" ? process.env.SERVER_URL : BACKEND_LOCAL;

/* Route groups and routes - separated by auth or security */
export const REST_GROUP_PUBLIC = "/public";
export const REST_PUBLIC_LOGIN = "/login";
export const REST_PUBLIC_REGISTER = "/register";

export const REST_GROUP_VERIFICATION = "/verification";
export const REST_VERIFICATION_VERIFICATION = "/verification";

export const REST_GROUP_AUTH = "/jwt";
export const REST_AUTH_RECONNECT = "/reconnect";
export const REST_AUTH_LOGOUT = "/logout";
export const REST_AUTH_DATA = "/data";

export const REST_GROUP_ADMIN = "/admin";

export const REST_GROUP_ADMIN_USER = `${REST_GROUP_ADMIN}/user_manager`;
export const REST_ADMIN_USERS = "/users";
export const REST_ADMIN_REGISTRATIONS = "/registrations";

export const REST_GROUP_ADMIN_ORGANIZATION = `${REST_GROUP_ADMIN}/organization_manager`;
export const REST_ADMIN_ORGANIZATIONS = "/organizations";

export const REST_GROUP_ADMIN_SECTOR = `${REST_GROUP_ADMIN}/sector_manager`;
export const REST_ADMIN_SECTORS = "/sectors";

// HTTP error codes
export const HTTP_ERROR_INVALID_TOKEN = 401;
export const HTTP_ERROR_UNAUTHORIZED = 403;