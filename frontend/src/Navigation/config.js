const createUserNavigation = () => {
  const userTitle = { title: true, name: "User" };

  const templates = { 
    name: "Templates", 
    url: "/template_manager/templates", 
    icon: "mdi mdi-note-multiple" 
  }
  const statuses = { 
    name: "Statuses", 
    url: "/statuses", 
    icon: "mdi mdi-note-multiple" 
  }
  const templateTypes = { 
    name: "Template Types", 
    url: "/template_manager/templateTypes", 
    icon: "mdi mdi-note-multiple" 
  }
  const templatePackages = { 
    name: "Template Packages", 
    url: "/template_manager/templatePackages", 
    icon: "mdi mdi-note-multiple" 
  }

  const COATrees = { name: "COA Trees", url: "/COA_manager/COA_trees", icon: "mdi mdi-shape" }

  const COAGroups = { name: "COA Groups", url: "/COA_manager/COA_groups", icon: "mdi mdi-shape" }

  const COAs = { name: "COAs", url: "/COA_manager/COAs", icon: "mdi mdi-shape" }

  const sheetNames = { 
    name: "Sheet Names", 
    url: "/sheetNames", 
    icon: "mdi mdi-note-multiple" 
  }

  // const userDashboard = { name: "Dashboard", url: ROUTE_USER_DASHBOARD, icon: "mdi mdi-library-books" }

  // ! Need to figure out how to nest navigation items

  return [ 
    userTitle, 
    /*userDashboard,*/ 
    // userProfile, 
    // userBundles, 
    statuses, 
    templates, 
    templateTypes,
    templatePackages,
    COATrees,
    COAGroups,
    COAs,
    sheetNames
  ];
};

const config = (roles) => {
  const userNavigation = createUserNavigation();

  return { items: [ ...userNavigation ] };
};

export default config;