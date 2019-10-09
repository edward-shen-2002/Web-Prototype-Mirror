// TODO : Change this for the new design

const config = (permissions) => {
  const userTitle = { title: true, name: "User" };
  
  const userProfile = { name: "My Profile", url: "/profile", icon: "mdi mdi-account-card-details-outline" };

  const userPackages = { name: "My Packages", url: "/packages", icon: "mdi mdi-pen" };

  const userSection = [ userTitle, userProfile, userPackages ];

  const adminTitle = { title: true, name: "Admin" };

  const adminTemplate = {
    name: "Template",
    icon: "mdi mdi-note-multiple",
    children: [
      {
        name: "All Templates",
        url: "/workbooks/template",
        icon: "mdi mdi-table-large"
      },
      {
        name: "Create Template",
        url: "/workbooks/create",
        icon: "mdi mdi-table-large-plus"
      }
    ]
  };

  const adminCellData = {
    name: "Cell Data",
    icon: "mdi mdi-buffer",
    children: [
      {
        name: "Attributes",
        url: "/workbooks/attributes",
        icon: "mdi mdi-table-column"
      },
      {
        name: "Categories",
        url: "/workbooks/categories",
        icon: "mdi mdi-table-row"
      },
      {
        name: "Attribute Group",
        url: "/attribute/group",
        icon: "mdi mdi-checkbook"
      },
      {
        name: "Category Group",
        url: "/category/group",
        icon: "mdi mdi-checkbook"
      },
      {
        name: "Import ID",
        url: "/import/id",
        icon: "mdi mdi-application-import"
      }
    ]
  };

  const adminUsers = {
    name: "Users",
    icon: "mdi mdi-account",
    children: [
      {
        name: "All Users",
        url: "/users",
        icon: "mdi mdi-account-multiple"
      },
      {
        name: "Registration Requests",
        url: "/registrationRequest",
        icon: "mdi mdi-account"
      },
      {
        name: "Organizations",
        url: "/admin/organizations",
        icon: "mdi mdi-account-group"
      },
      {
        name: "Org Types",
        url: "/admin/orgtypes",
        icon: "mdi mdi-account-network"
      }
    ]
  };

  const adminPackages = {
    name: "Package",
    icon: "mdi mdi-package-variant",
    children: [
      {
        name: "All Packages",
        url: "/admin/packages",
        icon: "mdi mdi-package",
      },
      {
        name: "Create Package",
        url: "/admin/packages/create",
        icon: "mdi mdi-shape-square-plus",
      }
    ]
  };

  // TODO: separate each children of section to filter permission
  // let adminSection;

  // if(permissions.length) {
  //   adminSection = [
  //     adminTitle,

  //   ];
  // } else {
  //   adminSection = [];
  // }

  const adminSection = [ adminTitle, adminTemplate, adminCellData, adminUsers, adminPackages ];

  return { items: [ ...userSection, ...adminSection ] };
};

export default config;