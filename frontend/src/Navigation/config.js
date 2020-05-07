import { 
  ROUTE_USER_PROFILE,
  ROUTE_USER_BUNDLES,
  // ROUTE_USER_DASHBOARD,

  ROUTE_ADMIN_USER_USERS, 
  ROUTE_ADMIN_USER_REGISTRATIONS,
  ROUTE_ADMIN_BUNDLE_BUNDLES,
  ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS,

  ROUTE_ADMIN_SECTOR_SECTORS,
  ROUTE_ADMIN_TEMPLATE_TEMPLATES,
  ROUTE_ADMIN_DATA_ENTITY_BUSINESS_CONCEPTS,
  ROUTE_ADMIN_DATA_ENTITY_GROUPS
} from "@constants/routes";

import { ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";

const roleNavMap = {
  USER_MANAGER: {
    name: "Users",
    icon: "mdi mdi-account",
    children: [
      { name: "Users", url: ROUTE_ADMIN_USER_USERS, icon: "mdi mdi-account-multiple" },
      { name: "Registration", url: ROUTE_ADMIN_USER_REGISTRATIONS, icon: "mdi mdi-account" }
    ]
  },
  TEMPLATE_MANAGER: {
    name: "Templates",
    icon: "mdi mdi-note-multiple",
    url: ROUTE_ADMIN_TEMPLATE_TEMPLATES
  },
  BUNDLE_MANAGER: {
    name: "Bundles",
    icon: "mdi mdi-package-variant",
    url: ROUTE_ADMIN_BUNDLE_BUNDLES
  },
  ORGANIZATION_MANAGER: {
    name: "Organizations",
    icon: "mdi mdi-account-group",
    url: ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS
  },
  DATA_ENTITY_MANAGER: {
    name: "Data Entities",
    icon: "mdi mdi-buffer",
    children: [
      { name: "Concepts", url: ROUTE_ADMIN_DATA_ENTITY_BUSINESS_CONCEPTS, icon: "mdi mdi-shape" },
      { name: "Groups", url: ROUTE_ADMIN_DATA_ENTITY_GROUPS, icon: "mdi mdi-group" } 
    ]
  },
  SECTOR_MANAGER: {
    name: "Sector",
    icon: "mdi mdi-account-group",
    url: ROUTE_ADMIN_SECTOR_SECTORS
  }
};

const createAdminNavigation = (roles) => {
  let adminNav = [ { title: true, name: "Admin" } ];

  for(let role in roles) {
    if(roles[role].scope !== ROLE_LEVEL_NOT_APPLICABLE) {
      const roleNav = roleNavMap[role];

      if(roleNav !== undefined) adminNav.push(roleNav);
    }
  }

  return adminNav;
};

const createUserNavigation = () => {
  const userTitle = { title: true, name: "User" };
  
  const userProfile = { name: "Profile", url: ROUTE_USER_PROFILE, icon: "mdi mdi-account-card-details-outline" };

  const userBundles = { name: "Bundles", url: ROUTE_USER_BUNDLES, icon: "mdi mdi-pen" };

  const template = { name: "Template", url: "/designer/template", icon: "mdi mdi-note-multiple" }
  const status = { name: "Status", url: "/designer/status", icon: "mdi mdi-note-multiple" }
  const templateType = { name: "Template Type", url: "/designer/templateType", icon: "mdi mdi-note-multiple" }
  const templatePackage = { name: "Template Package", url: "/designer/templatePackage", icon: "mdi mdi-note-multiple" }
  // const userDashboard = { name: "Dashboard", url: ROUTE_USER_DASHBOARD, icon: "mdi mdi-library-books" }

  return [ 
    userTitle, 
    /*userDashboard,*/ 
    // userProfile, 
    // userBundles, 
    template, 
    status, 
    templateType,
    templatePackage
  ];
};

const config = (roles) => {
  const userNavigation = createUserNavigation();
  const adminNavigation = createAdminNavigation(roles);

  return { items: [ ...userNavigation, ...adminNavigation ] };
};

export default config;