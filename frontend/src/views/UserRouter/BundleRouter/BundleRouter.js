import React, { lazy } from "react";

import { Route, Switch } from "react-router-dom";

const Bundles = lazy(() => import("./Bundles"));
const BundleEdit = lazy(() => import("./BundleEdit"));
const BundleReview = lazy(() => import("./BundleReview"));
const BundleApprove = lazy(() => import("./BundleApprove"));
const Workbook = lazy(() => import("./Workbook"));

import NotFound from "tools/components/NotFound";

import { ROUTE_USER_BUNDLES } from "constants/routes";

const BundleRouter = () => (
  <Switch>
    <Route exact path={ROUTE_USER_BUNDLES} component={Bundles}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/edit/:_id`} component={BundleEdit}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/review/:_id`} component={BundleReview}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/approve/:_id`} component={BundleApprove}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/:_phase/:_bundleId/workbook/:_id`} component={Workbook}/>

    <Route component={NotFound}/>
  </Switch>
);

export default BundleRouter;