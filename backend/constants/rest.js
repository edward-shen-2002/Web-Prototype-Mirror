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
export const ROUTE_DATA = "/data";

export const ROUTE_GROUP_ADMIN = "/admin";

export const ROUTE_GROUP_ADMIN_USER = `${ROUTE_GROUP_ADMIN}/user_manager`;
export const ROUTE_ADMIN_USERS = "/users";
export const ROUTE_ADMIN_REGISTRATIONS = "/registrations";

export const ROUTE_GROUP_ADMIN_ORGANIZATION = `${ROUTE_GROUP_ADMIN}/organization_manager`;
export const ROUTE_ADMIN_ORGANIZATIONS = "/organizations";

export const ROUTE_GROUP_ADMIN_SECTOR = `${ROUTE_GROUP_ADMIN}/sector_manager`;
export const ROUTE_ADMIN_SECTORS = "/sectors";

export const ROUTE_GROUP_ADMIN_TEMPLATE = `${ROUTE_GROUP_ADMIN}/template_manager`;
export const ROUTE_ADMIN_TEMPLATES = "/templates";
export const ROUTE_ADMIN_BUSINESS_CONCEPTS = "/business_concepts";

export const ROUTE_GROUP_ADMIN_BUNDLE = `${ROUTE_GROUP_ADMIN}/bundle_manager`;
export const ROUTE_ADMIN_BUNDLES = "/bundles";

export const ROUTE_GROUP_ADMIN_EDIT_BUNDLE = `${ROUTE_GROUP_ADMIN}/edit_bundle_manager`;
export const ROUTE_ADMIN_EDIT_BUNDLES = "/edit_bundles";

export const ROUTE_GROUP_ADMIN_REVIEW_BUNDLE = `${ROUTE_GROUP_ADMIN}/review_bundle_manager`;
export const ROUTE_ADMIN_REVIEW_BUNDLES = "/review_bundles";

export const ROUTE_GROUP_ADMIN_APPROVE_BUNDLE = `${ROUTE_GROUP_ADMIN}/approve_bundle_manager`;
export const ROUTE_ADMIN_APPROVE_BUNDLES = "/approve_bundles";

/** HTTP response status codes */
//Success codes
export const HTTP_SUCCESS = 200;
//Error codes
export const HTTP_ERROR_SYNTAX = 400;
export const HTTP_ERROR_AUTH_FAIL = 401;
export const HTTP_ERROR_UNAUTHORIZED = 403;
export const HTTP_ERROR_NOT_FOUND = 404;
export const HTTP_ERROR_CONFLICT = 409;
export const HTTP_ERROR_DATABASE = 500;