const createUserNavigation = () => {
  const userTitle = { title: true, name: "User" };

  const template = { 
    name: "Template", 
    url: "/template_manager/templates", 
    icon: "mdi mdi-note-multiple" 
  }
  const status = { 
    name: "Status", 
    url: "/status", 
    icon: "mdi mdi-note-multiple" 
  }
  const templateType = { 
    name: "Template Type", 
    url: "/template_manager/templateType", 
    icon: "mdi mdi-note-multiple" 
  }
  const templatePackage = { 
    name: "Template Package", 
    url: "/template_manager/templatePackage", 
    icon: "mdi mdi-note-multiple" 
  }

  const COATrees = { name: "COA Trees", url: "/COA_manager/COA_trees", icon: "mdi mdi-shape" }

  const COATree = { name: "COA Tree", url: "/COA_manager/COA_tree", icon: "mdi mdi-shape" }

  const COAGroups = { name: "COA Groups", url: "/COA_manager/COA_groups", icon: "mdi mdi-shape" }

  const COAs = { name: "COAs", url: "/COA_manager/COAs", icon: "mdi mdi-shape" }

  // const userDashboard = { name: "Dashboard", url: ROUTE_USER_DASHBOARD, icon: "mdi mdi-library-books" }

  // ! Need to figure out how to nest navigation items

  return [ 
    userTitle, 
    /*userDashboard,*/ 
    // userProfile, 
    // userBundles, 
    status, 
    template, 
    templateType,
    templatePackage,
    COATree,
    COATrees,
    COAGroups,
    COAs
  ];
};

const config = (roles) => {
  const userNavigation = createUserNavigation();

  return { items: [ ...userNavigation ] };
};

export default config;