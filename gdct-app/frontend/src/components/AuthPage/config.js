import React from 'react'

import InboxIcon from '@material-ui/icons/Inbox'
import ExtensionIcon from '@material-ui/icons/Extension'
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import DataUsageIcon from '@material-ui/icons/DataUsage'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SendIcon from '@material-ui/icons/Send'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import GridOnIcon from '@material-ui/icons/GridOn'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import AppsIcon from '@material-ui/icons/Apps'

const createUserNavigation = () => {
  return [
    {
      name: 'User',
      button: false,
      type: 'title',
      icon: <PeopleAltIcon />,
    },
    {
      name: 'Template',
      type: 'drawer',
      icon: <PhotoFilterIcon />,
      children: [
        {
          name: 'Templates',
          type: 'menu',
          url: '/template_manager/templates',
          icon: <PhotoFilterIcon />,
        },
        {
          name: 'Template Types',
          type: 'menu',
          url: '/template_manager/templateTypes',
          icon: <ExtensionIcon />,
        },
        {
          name: 'Template Packages',
          type: 'menu',
          url: '/template_manager/templatePackages',
          icon: <DashboardIcon />,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      name: 'COA',
      icon: <DataUsageIcon />,
      type: 'drawer',
      children: [
        {
          name: 'COAs',
          type: 'menu',
          url: '/COA_manager/COAs',
          icon: <DataUsageIcon />,
        },
        {
          name: 'COA Groups',
          type: 'menu',
          url: '/COA_manager/COA_groups',
          icon: <GroupWorkIcon />,
        },
        {
          name: 'COA Trees',
          type: 'menu',
          url: '/COA_manager/COA_trees',
          icon: <AccountTreeIcon />,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      name: 'Submission',
      icon: <SendIcon />,
      type: 'drawer',
      children: [
        {
          name: 'Submissions',
          type: 'menu',
          url: '/submission_manager/submissions',
          icon: <SendIcon />,
        },
        {
          name: 'Submission Periods',
          type: 'menu',
          url: '/submission_manager/submissionPeriods',
          icon: <HourglassEmptyIcon />,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      name: 'AppSyses',
      icon: <AppsIcon />,
      type: 'drawer',
      children: [
        {
          name: 'AppSyses',
          type: 'menu',
          url: '/appsys_manager/AppSyses',
          icon: <GroupWorkIcon />,
        },
        {
          name: 'AppSysRoles',
          type: 'menu',
          url: '/appsys_manager/AppSysRoles',
          icon: <GroupWorkIcon />,
        },
        {
          name: 'AppRoles',
          type: 'menu',
          url: '/appsys_manager/AppRoles',
          icon: <GroupWorkIcon />,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      name: 'Sheet Names',
      type: 'menu',
      url: '/sheetNames',
      icon: <GridOnIcon />,
    },
    {
      name: 'Statuses',
      type: 'menu',
      url: '/statuses',
      icon: <AllInclusiveIcon />,
    },
    {
      name: 'Reporting Periods',
      type: 'menu',
      url: '/reportingPeriods',
      icon: <HourglassEmptyIcon />,
    },
  ]
}

const config = [...createUserNavigation()]

export default config
