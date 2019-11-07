import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

const Packages = lazy(() => import("./Packages"));

import NotFound from "tools/components/NotFound";

import { ROUTE_ADMIN_PACKAGE_PACKAGES } from "constants/routes";

const PackageRouter = () => (
  <Switch>
    <Route path={ROUTE_ADMIN_PACKAGE_PACKAGES} component={Packages}/>

    <Route component={NotFound}/>
  </Switch>
);

export default PackageRouter;
