import React from "react";

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

const Navigation = (props) => (
  <AppSidebar className="appNav" display="lg">
    <AppSidebarHeader/>
    <AppSidebarForm/>
    {/* Props required for react router */}
    <AppSidebarNav navConfig={config(props.permissions)} {...props}/>
    <AppSidebarFooter/>
    <AppSidebarMinimizer/>
  </AppSidebar>
);

export default Navigation;