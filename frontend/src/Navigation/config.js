const createUserNavigation = () => {
  const userTitle = { title: true, name: "User" };

  const template = { 
    name: "Template", 
    url: "/template_manager/template", 
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

  const COATree = { name: "COA Trees", url: "/COA_manager/COA_tree", icon: "mdi mdi-shape" }

  // const userDashboard = { name: "Dashboard", url: ROUTE_USER_DASHBOARD, icon: "mdi mdi-library-books" }

  return [ 
    userTitle, 
    /*userDashboard,*/ 
    // userProfile, 
    // userBundles, 
    template, 
    status, 
    templateType,
    templatePackage,
    COATree
  ];
};

const config = (roles) => {
  const userNavigation = createUserNavigation();

  return { items: [ ...userNavigation ] };
};

export default config;