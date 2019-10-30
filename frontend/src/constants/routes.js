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
export const ROUTE_ADMIN_USER_REGISTRATION = `${ROUTE_ADMIN_USER}/registration`;

export const ROUTE_ADMIN_DATA = `${ROUTE_ADMIN_ROOT}/data_manager`;
export const ROUTE_ADMIN_DATA_DATAGROUPS = `${ROUTE_ADMIN_DATA}/data_groups`;
export const ROUTE_ADMIN_DATA_ATTRIBUTES = `${ROUTE_ADMIN_DATA}/attributes`;
export const ROUTE_ADMIN_DATA_CATEGORIES = `${ROUTE_ADMIN_DATA}/categories`;

export const ROUTE_ADMIN_PACKAGE = `${ROUTE_ADMIN_ROOT}/package_manager`;
export const ROUTE_ADMIN_PACKAGE_PACKAGES = `${ROUTE_ADMIN_PACKAGE}/packages`;
// Should create package be a dialog instead of a different page?

export const ROUTE_ADMIN_ORGANIZATION = `${ROUTE_ADMIN_ROOT}/organization_manager`;
export const ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS = `${ROUTE_ADMIN_ORGANIZATION}/organizations`;
export const ROUTE_ADMIN_ORGANIZATION_TYPES = `${ROUTE_ADMIN_ORGANIZATION}/types`;

export const ROUTE_ADMIN_LHIN = `${ROUTE_ADMIN_ROOT}/LHIN_manager`;
export const ROUTE_ADMIN_LHIN_LHIN = `${ROUTE_ADMIN_LHIN}/LHINs`;

export const ROUTE_ADMIN_SECTOR = `${ROUTE_ADMIN_ROOT}/sector_manager`;
export const ROUTE_ADMIN_SECTOR_SECTOR = `${ROUTE_ADMIN_SECTOR}/sectors`;