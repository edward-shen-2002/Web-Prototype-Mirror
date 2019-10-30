const PORT = 3003;

const FRONTEND_LOCAL = `http://localhost:${PORT}`;

export const FRONTEND_SERVER = process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : FRONTEND_LOCAL;

/* Router groups and routes- separated by auth or security */
export const ROUTE_GROUP_PUBLIC = "/public";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";

export const ROUTE_GROUP_VERIFICATION = "/verification";
export const ROUTE_VERFICATION = "/verification";

export const ROUTE_GROUP_AUTH = "/jwt";
export const ROUTE_RECONNECT = "/reconnect";
export const ROUTE_LOGOUT = "/logout";

export const ROUTE_GROUP_ADMIN = "/admin";

export const ROUTE_GROUP_ADMIN_USER = `${ROUTE_GROUP_ADMIN}/user_manager`;
export const ROUTE_ADMIN_USERS = "/users";

export const ROUTE_GROUP_ADMIN_DATA = `${ROUTE_GROUP_ADMIN}/data_manager`;
export const ROUTE_ADMIN_DATAGROUPS = "/data_groups";

/** HTTP response status codes */
//Success codes
export const HTTP_SUCCESS = 200;
//Error codes
export const HTTP_ERROR_SYNTAX = 400;
export const HTTP_ERROR_AUTH_FAIL = 401;
export const HTTP_ERROR_UNAUTHORIZED = 403;
export const HTTP_ERROR_CONFLICT = 409;
export const HTTP_ERROR_DATABASE = 500;