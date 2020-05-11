const createUserNavigation = () => {
  const userTitle = { title: true, name: "User" };


  const template = { name: "Template", url: "/designer/template_manager/template", icon: "mdi mdi-note-multiple" }
  const status = { name: "Status", url: "/designer/status", icon: "mdi mdi-note-multiple" }
  const templateType = { name: "Template Type", url: "/designer/template_manager/templateType", icon: "mdi mdi-note-multiple" }
  const templatePackage = { name: "Template Package", url: "/designer/template_manager/templatePackage", icon: "mdi mdi-note-multiple" }
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

  return { items: [ ...userNavigation ] };
};

export default config;