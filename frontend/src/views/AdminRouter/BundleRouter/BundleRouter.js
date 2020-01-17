import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "@tools/components/NotFound";
import { ROUTE_ADMIN_BUNDLE_BUNDLES } from "@constants/routes";

const Bundles = lazy(() => import("./Bundles"));
const Bundle = lazy(() => import("./Bundle"));

const BundleRouter = () => (
  <Switch>
    <Route exact path={ROUTE_ADMIN_BUNDLE_BUNDLES} component={Bundles}/>
    <Route exact path={`${ROUTE_ADMIN_BUNDLE_BUNDLES}/:_id`} component={Bundle}/>
    <Route component={NotFound}/>
  </Switch>
);

export default BundleRouter;
