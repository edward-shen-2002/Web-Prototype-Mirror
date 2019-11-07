import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "tools/components/NotFound";

import { ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS } from "constants/routes";

const Organizations = lazy(() => import("./Organizations"));

const OrganizationRouter = () => (
  <Switch>
    <Route path={ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS} component={Organizations}/>

    <Route component={NotFound}/>
  </Switch>
);

export default OrganizationRouter;