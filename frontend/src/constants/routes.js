// TODO : CHANGE THIS TO COMPOSITIONAL ROUTING!!!

export const ROUTE_ROOT = "/";
export const ROUTE_DASHBOARD = "/dashboard";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_VERIFICATION = "/verification/:_id";
export const ROUTE_RECOVERY = "/recovery";
export const ROUTE_PROFILE = "/profile";

// Admin routes
export const ROUTE_ADMIN_ROOT = "/admin";

export const ROUTE_ADMIN_USER = `${ROUTE_ADMIN_ROOT}/user_manager`;
export const ROUTE_ADMIN_USER_USERS = `${ROUTE_ADMIN_USER}/users`;
export const ROUTE_ADMIN_USER_REGISTRATIONS = `${ROUTE_ADMIN_USER}/registrations`;

export const ROUTE_ADMIN_TEMPLATE = `${ROUTE_ADMIN_ROOT}/template_manager`;
export const ROUTE_ADMIN_TEMPLATE_TEMPLATES = `${ROUTE_ADMIN_TEMPLATE}/templates`;
export const ROUTE_ADMIN_TEMPLATE_TEMPLATE = `${ROUTE_ADMIN_TEMPLATE}/:_id`;

export const ROUTE_ADMIN_PACKAGE = `${ROUTE_ADMIN_ROOT}/package_manager`;
export const ROUTE_ADMIN_PACKAGE_PACKAGES = `${ROUTE_ADMIN_PACKAGE}/packages`;

export const ROUTE_ADMIN_ORGANIZATION = `${ROUTE_ADMIN_ROOT}/organization_manager`;
export const ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS = `${ROUTE_ADMIN_ORGANIZATION}/organizations`;

export const ROUTE_ADMIN_LHIN = `${ROUTE_ADMIN_ROOT}/LHIN_manager`;
export const ROUTE_ADMIN_LHIN_LHIN = `${ROUTE_ADMIN_LHIN}/LHINs`;

export const ROUTE_ADMIN_SECTOR = `${ROUTE_ADMIN_ROOT}/sector_manager`;
export const ROUTE_ADMIN_SECTOR_SECTORS = `${ROUTE_ADMIN_SECTOR}/sectors`;
