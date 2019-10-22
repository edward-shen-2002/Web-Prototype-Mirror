/* Router groups and routes- separated by auth or security */
export const ROUTE_GROUP_PUBLIC = "/public";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";

export const ROUTE_GROUP_AUTH = "/jwt";
export const ROUTE_RECONNECT = "/reconnect";
export const ROUTE_LOGOUT = "/logout";

export const ROUTE_GROUP_ADMIN = "/admin";

export const ROUTE_GROUP_ADMIN_USER = `${ROUTE_GROUP_ADMIN}/user_manager`;
export const ROUTE_ADMIN_USERS = "/users";
export const ROUTE_ADMIN_USERS_UPDATE = `${ROUTE_ADMIN_USERS}/update`;
export const ROUTE_ADMIN_USERS_CREATE = `${ROUTE_ADMIN_USERS}/createa`;
export const ROUTE_ADMIN_USERS_DELETE = `${ROUTE_ADMIN_USERS}/delete`;

export const ROUTE_GROUP_ADMIN_DATA = `${ROUTE_GROUP_ADMIN}/data_manager`;
export const ROUTE_ADMIN_DATAGROUPS = "/data_groups";
export const ROUTE_ADMIN_DATAGROUPS_CREATE = `${ROUTE_ADMIN_DATAGROUPS}/create`;
export const ROUTE_ADMIN_DATAGROUPS_UPDATE = `${ROUTE_ADMIN_DATAGROUPS}/update`;
export const ROUTE_ADMIN_DATAGROUPS_DELETE = `${ROUTE_ADMIN_DATAGROUPS}/delete`;

/** HTTP Error messages */
export const MESSAGE_ERROR_CREDENTIALS = "Incorrect username or password";
export const MESSAGE_ERROR_DATABASE = "Error occured during database query";
export const MESSAGE_ERROR_CONFLICT_PARAMS = "One or more params is/are already taken";
export const MESSAGE_ERROR_AUTH_FAIL = "User unauthorized";

// export const ERROR_PASSWORD = "Incorrect password";
// export const ERROR_CONFLICT_USERNAME = "Username is already taken";
// export const ERROR_CONFLICT_EMAIL = "Email is already taken";
// export const ERROR_SYNTAX_PARAMS = "Invalid params syntax";
// export const ERROR_AUTH_PROCESS = "Error occured during authentication";

/** HTTP Success messages */
export const MESSAGE_SUCCESS_REGISTRATION = "Successfully registered";
export const MESSAGE_SUCCESS_LOGIN = "Successfully logged in";
export const MESSAGE_SUCCESS_LOGOUT = "Successfully logged out";
export const MESSAGE_SUCCESS_RECONNECT = "Successfully reconnected";
export const MESSAGE_SUCCESS_USERS = "Successfully fetched users";
export const MESSAGE_SUCCESS_USERS_DELETE = "Successfully deleted user";
export const MESSAGE_SUCCESS_DATAGROUPS = "Successfully fetched data groups";

/** HTTP response status codes */
//Success codes
export const HTTP_SUCCESS = 200;
//Error codes
export const HTTP_ERROR_SYNTAX = 400;
export const HTTP_ERROR_AUTH_FAIL = 401;
export const HTTP_ERROR_UNAUTHORIZED = 403;
export const HTTP_ERROR_CONFLICT = 409;
export const HTTP_ERROR_DATABASE = 500;