import React from 'react'

import InboxIcon from '@material-ui/icons/Inbox'

const createUserNavigation = () => {
  return [
    { 
      name: "User",
      button: false,
      type: "title",
      icon: <InboxIcon /> 
    },
    {
      name: "Template",
      type: "drawer",
      icon: <InboxIcon /> ,
      children: [
        {
          name: "Templates",
          type: "menu",
          url: "/template_manager/templates",
          icon: <InboxIcon /> 
        },
        {
          name: "Template Types",
          type: "menu",
          url: "/template_manager/templateTypes",
          icon: <InboxIcon /> 
        },
        {
          name: "Template Packages",
          type: "menu",
          url: "/template_manager/templatePackages",
          icon: <InboxIcon /> ,
        }
      ]
    },  
    {
      name: "COA",
      icon: <InboxIcon />,
      type: "drawer",
      children: [
        { 
          name: "COAs", 
          type: "menu",
          url: "/COA_manager/COAs", 
          icon: <InboxIcon /> ,
        },
        { 
          name: "COA Groups", 
          type: "menu",
          url: "/COA_manager/COA_groups", 
          icon: <InboxIcon /> ,
        },
        { 
          name: "COA Trees", 
          type: "menu",
          url: "/COA_manager/COA_trees", 
          icon: <InboxIcon /> ,
        }
      ]
    }, 
    {
      name: "Submission",
      icon: <InboxIcon />,
      type: "drawer",
      children: [
        { 
          name: "Submissions", 
          type: "menu",
          url: "/submission_manager/submissions", 
          icon: <InboxIcon /> ,
        },
        { 
          name: "Submission Periods", 
          type: "menu",
          url: "/submission_manager/submissionPeriods", 
          icon: <InboxIcon /> ,
        }
      ]
    },  
    {
      name: "Sheet Names",
      type: "menu",
      url: "/sheetNames",
      icon: <InboxIcon /> ,
    },
    {
      name: "Statuses",
      type: "menu",
      url: "/statuses",
      icon: <InboxIcon /> ,
    },  
    { 
      name: "AppSyses", 
      type: "menu",
      url: "/appsys_manager/AppSyses", 
      icon: <InboxIcon /> ,
    },
    { 
      name: "Reporting Periods", 
      type: "menu",
      url: "/reportingPeriods", 
      icon: <InboxIcon /> ,
    }
  ];
};

const config = [
  ...createUserNavigation()
]

export default config;