import React, { useMemo } from "react";

import config from "./config";

import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react';

import "./Navigation.scss";

// TODO : Change to https://material-ui.com/components/drawers/

const Navigation = (props) => {
  const { roles } = props;

  const navConfig = useMemo(() => config(roles), [ roles ]);

  return (
    <AppSidebar className="appNav" display="lg">
      <AppSidebarHeader/>
      <AppSidebarForm/>
      {/* Props required for react router */}
      <AppSidebarNav navConfig={navConfig} {...props}/>
      <AppSidebarFooter/>
      <AppSidebarMinimizer/>
    </AppSidebar>
  );
};

export default Navigation;