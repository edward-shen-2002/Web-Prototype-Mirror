const roleNavMap = {
  TEMPLATE_MANAGER: {
    name: "Templates",
    icon: "mdi mdi-note-multiple",
    children: [
      { name: "All Templates", url: "/workbooks/template", icon: "mdi mdi-table-large" },
      { name: "Create Template", url: "/workbooks/create", icon: "mdi mdi-table-large-plus" }
    ]
  },
  DATA_MANAGER: {
    name: "Cell Data",
    icon: "mdi mdi-buffer",
    children: [
      { name: "Attributes", url: "/workbooks/attributes", icon: "mdi mdi-table-column" },
      { name: "Categories", url: "/workbooks/categories", icon: "mdi mdi-table-row" },
      { name: "Data Group", url: "/data/group", icon: "mdi mdi-checkbook" }
    ]
  },
  PACKAGE_MANAGER: {
    name: "Packages",
    icon: "mdi mdi-package-variant",
    children: [ 
      { name: "All Packages", url: "/admin/packages", icon: "mdi mdi-package" },
      { name: "Create Package", url: "/admin/packages/create", icon: "mdi mdi-shape-square-plus" }
    ]
  },
  USER_MANAGER: {
    name: "Users",
    icon: "mdi mdi-account",
    children: [
      { name: "All Users", url: "/users", icon: "mdi mdi-account-multiple" },
      { name: "Registration Requests", url: "/registrationRequest", icon: "mdi mdi-account" }
    ]
  },
  ORGANIZATION_MANAGER: {
    name: "Organizations",
    icon: "mdi mdi-account-group",
    children: [
      { name: "Organizations", url: "/admin/organizations", icon: "mdi mdi-account-group" },
      { name: "Organization Types", url: "/admin/orgtypes", icon: "mdi mdi-account-network" }
    ]
  }
};

const createAdminNavigation = (permissions) => {
  if(!permissions.length) return [];

  let adminNav = [ { title: true, name: "Admin" } ];

  permissions.forEach((permission) => {
    const roleNav = roleNavMap[permission];
    
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

const config = (permissions) => {
  const userNavigation = createUserNavigation();
  const adminNavigation = createAdminNavigation(permissions);

  return { items: [ ...userNavigation, ...adminNavigation ] };
};

export default config;