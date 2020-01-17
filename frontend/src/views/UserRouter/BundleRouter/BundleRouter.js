import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "@tools/components/NotFound";
import { ROUTE_USER_BUNDLES } from "@constants/routes";

const Bundles = lazy(() => import("./Bundles"));
const BundlePhase = lazy(() => import("./BundlePhase"));
const Workbook = lazy(() => import("./Workbook"));

const BundleRouter = () => (
  <Switch>
    <Route exact path={ROUTE_USER_BUNDLES} component={Bundles}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/:phase/:_id`} component={BundlePhase}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/:phase/:bundleId/workbook/:workbookId`} component={Workbook}/>

    <Route component={NotFound}/>
  </Switch>
);

export default BundleRouter;