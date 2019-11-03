import { 
  ROUTE_ADMIN_USER_USERS, 
  ROUTE_ADMIN_USER_REGISTRATIONS,

  ROUTE_ADMIN_PACKAGE_PACKAGES,

  ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS,

  ROUTE_ADMIN_LHIN_LHIN,

  ROUTE_ADMIN_SECTOR_SECTORS,

  ROUTE_ADMIN_TEMPLATE_TEMPLATES,
  ROUTE_ADMIN_TEMPLATE_ATTRIBUTES,
  ROUTE_ADMIN_TEMPLATE_CATEGORIES
} from "constants/routes";

import { ROLE_LEVEL_NOT_APPLICABLE } from "constants/roles";

const roleNavMap = {
  TEMPLATE_MANAGER: {
    name: "Templates",
    icon: "mdi mdi-note-multiple",
    children: [
      { name: "Templates", url: ROUTE_ADMIN_TEMPLATE_TEMPLATES, icon: "mdi mdi-table-large" },
      { name: "Attributes", url: ROUTE_ADMIN_TEMPLATE_ATTRIBUTES, icon: "mdi mdi-table-column" },
      { name: "Categories", url: ROUTE_ADMIN_TEMPLATE_CATEGORIES, icon: "mdi mdi-table-row" },
    ]
  },
  PACKAGE_MANAGER: {
    name: "Packages",
    icon: "mdi mdi-package-variant",
    children: [ 
      { name: "Packages", url: ROUTE_ADMIN_PACKAGE_PACKAGES, icon: "mdi mdi-package" },
    ]
  },
  USER_MANAGER: {
    name: "Users",
    icon: "mdi mdi-account",
    children: [
      { name: "Users", url: ROUTE_ADMIN_USER_USERS, icon: "mdi mdi-account-multiple" },
      { name: "Registration", url: ROUTE_ADMIN_USER_REGISTRATIONS, icon: "mdi mdi-account" }
    ]
  },
  ORGANIZATION_MANAGER: {
    name: "Organizations",
    icon: "mdi mdi-account-group",
    children: [
      { name: "Organizations", url: ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS, icon: "mdi mdi-account-group" }
    ]
  },
  LHIN_MANAGER: {
    name: "LHIN",
    icon: "mdi mdi-account-group",
    children: [
      { name: "LHIN", url: ROUTE_ADMIN_LHIN_LHIN, icon: "mdi mdi-account-group" }
    ]
  },
  SECTOR_MANAGER: {
    name: "Sector",
    icon: "mdi mdi-account-group",
    children: [
      { name: "Sector", url: ROUTE_ADMIN_SECTOR_SECTORS, icon: "mdi mdi-account-group" }
    ]
  },
};

const createAdminNavigation = (roles) => {
  let adminNav = [ { title: true, name: "Admin" } ];

  for(let role in roles) {
    if(roles[role].scope !== ROLE_LEVEL_NOT_APPLICABLE) {
      const roleNav = roleNavMap[role];

      if(typeof roleNav !== "undefined") adminNav.push(roleNav);
    }
  }

  return adminNav;
};

const createUserNavigation = () => {
  const userTitle = { title: true, name: "User" };
  
  const userProfile = { name: "My Profile", url: "/profile", icon: "mdi mdi-account-card-details-outline" };

  const userPackages = { name: "My Packages", url: "/packages", icon: "mdi mdi-pen" };

  return [ userTitle, userProfile, userPackages ];
};

const config = (roles) => {
  const userNavigation = createUserNavigation();
  const adminNavigation = createAdminNavigation(roles);

  return { items: [ ...userNavigation, ...adminNavigation ] };
};

export default config;