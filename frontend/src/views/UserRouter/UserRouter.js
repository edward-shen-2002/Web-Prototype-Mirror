import React, { lazy } from "react";

import { Route, Switch } from "react-router-dom";

import { ROUTE_USER_PROFILE, ROUTE_USER_DASHBOARD, ROUTE_USER_BUNDLES } from "constants/routes";

import BundleEdit from "./BundleEdit";
import BundleReview from "./BundleReview";
import BundleApprove from "./BundleApprove";

const Profile = lazy(() => import("./Profile"));
const Dashboard = lazy(() => import("./Dashboard"));
const Bundles = lazy(() => import("./Bundles"));
const WorkbookEdit = lazy(() => import("./BundleEdit/WorkbookEdit"));

import NotFound from "tools/components/NotFound";

// ! Change this structure later!!!
const UserRouter = () => (
  <Switch>
    <Route exact path={ROUTE_USER_DASHBOARD} component={Dashboard}/>
    <Route exact path={ROUTE_USER_PROFILE} component={Profile}/>
    <Route exact path={ROUTE_USER_BUNDLES} component={Bundles}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/edit/:_id`} component={BundleEdit}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/review/:_id`} component={BundleReview}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/approve/:_id`} component={BundleApprove}/>
    <Route exact path={`${ROUTE_USER_BUNDLES}/edit/workbook/:_id`} component={WorkbookEdit}/>

    <Route component={NotFound}/>
  </Switch>
);

export default UserRouter;