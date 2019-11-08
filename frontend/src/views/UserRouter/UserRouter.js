import React, { lazy } from "react";

import { Route, Switch } from "react-router-dom";

import { ROUTE_USER_PROFILE, ROUTE_USER_DASHBOARD } from "constants/routes";

const Profile = lazy(() => import("./Profile"));
const Dashboard = lazy(() => import("./Dashboard"));

import NotFound from "tools/components/NotFound";

const UserRouter = () => (
  <Switch>
    <Route exact path={ROUTE_USER_DASHBOARD} component={Dashboard}/>
    <Route exact path={ROUTE_USER_PROFILE} component={Profile}/>

    <Route component={NotFound}/>
  </Switch>
);

export default UserRouter;