import { 
  ROUTE_ADMIN_USER_USERS, 
  ROUTE_ADMIN_USER_REGISTRATION,

  ROUTE_ADMIN_DATA_DATAGROUP, 
  ROUTE_ADMIN_DATA_ATTRIBUTES,
  ROUTE_ADMIN_DATA_CATEGORIES,

  ROUTE_ADMIN_PACKAGE_PACKAGES,

  ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS ,
  ROUTE_ADMIN_ORGANIZATION_TYPES
} from "constants/routes";

const roleNavMap = {
  TEMPLATE_MANAGER: {
    name: "Templates",
    icon: "mdi mdi-note-multiple",
    children: [
      { name: "All Templates", url: "/admin/workbooks/template", icon: "mdi mdi-table-large" },
      { name: "Create Template", url: "/admin/workbooks/create", icon: "mdi mdi-table-large-plus" }
    ]
  },
  DATA_MANAGER: {
    name: "Cell Data",
    icon: "mdi mdi-buffer",
    children: [
      { name: "Attributes", url: ROUTE_ADMIN_DATA_ATTRIBUTES, icon: "mdi mdi-table-column" },
      { name: "Categories", url: ROUTE_ADMIN_DATA_CATEGORIES, icon: "mdi mdi-table-row" },
      { name: "Data Group", url: ROUTE_ADMIN_DATA_DATAGROUP, icon: "mdi mdi-checkbook" }
    ]
  },
  PACKAGE_MANAGER: {
    name: "Packages",
    icon: "mdi mdi-package-variant",
    children: [ 
      { name: "All Packages", url: ROUTE_ADMIN_PACKAGE_PACKAGES, icon: "mdi mdi-package" },
      // { name: "Create Package", url: "/admin/packages/create", icon: "mdi mdi-shape-square-plus" }
    ]
  },
  USER_MANAGER: {
    name: "Users",
    icon: "mdi mdi-account",
    children: [
      { name: "All Users", url: ROUTE_ADMIN_USER_USERS, icon: "mdi mdi-account-multiple" },
      { name: "Registration", url: ROUTE_ADMIN_USER_REGISTRATION, icon: "mdi mdi-account" }
    ]
  },
  ORGANIZATION_MANAGER: {
    name: "Organizations",
    icon: "mdi mdi-account-group",
    children: [
      { name: "Organizations", url: ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS, icon: "mdi mdi-account-group" },
      { name: "Organization Types", url: ROUTE_ADMIN_ORGANIZATION_TYPES, icon: "mdi mdi-account-network" }
    ]
  }
};

const createAdminNavigation = (roles) => {
  if(!roles.length) return [];

  let adminNav = [ { title: true, name: "Admin" } ];

  roles.forEach((role) => {
    const roleNav = roleNavMap[role];
    
    if(typeof roleNav !== "undefined") adminNav.push(roleNav);
  });

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