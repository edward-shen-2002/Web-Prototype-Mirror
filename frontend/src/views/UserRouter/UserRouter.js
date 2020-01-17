import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "@tools/components/NotFound";
import { ROUTE_USER_PROFILE, ROUTE_USER_DASHBOARD, ROUTE_USER_BUNDLES } from "@constants/routes";

const Profile = lazy(() => import("./Profile"));
const Dashboard = lazy(() => import("./Dashboard"));
const BundleRouter = lazy(() => import("./BundleRouter"));

const UserRouter = () => (
  <Switch>
    <Route exact path={ROUTE_USER_DASHBOARD} component={Dashboard}/>
    <Route exact path={ROUTE_USER_PROFILE} component={Profile}/>
    <Route path={ROUTE_USER_BUNDLES} component={BundleRouter}/>

    <Route component={NotFound}/>
  </Switch>
);

export default UserRouter;