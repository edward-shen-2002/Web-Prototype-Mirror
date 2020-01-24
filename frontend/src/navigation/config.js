import { 
  ROUTE_USER_PROFILE,
  ROUTE_USER_BUNDLES,
  ROUTE_USER_DASHBOARD,

  ROUTE_ADMIN_USER_USERS, 
  ROUTE_ADMIN_USER_REGISTRATIONS,
  ROUTE_ADMIN_BUNDLE_BUNDLES,
  ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS,
  // ROUTE_ADMIN_LHIN_LHIN,
  ROUTE_ADMIN_SECTOR_SECTORS,
  ROUTE_ADMIN_TEMPLATE_TEMPLATES,
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

  // const userDashboard = { name: "Dashboard", url: ROUTE_USER_DASHBOARD, icon: "mdi mdi-library-books" }

  return [ userTitle, /*userDashboard,*/ userProfile, userBundles ];
};

const config = (roles) => {
  const userNavigation = createUserNavigation();
  const adminNavigation = createAdminNavigation(roles);

  return { items: [ ...userNavigation, ...adminNavigation ] };
};

export default config;