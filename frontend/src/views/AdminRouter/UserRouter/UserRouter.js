import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

const Users = lazy(() => import("./Users"));
const Registrations = lazy(() => import("./Registrations"));

import NotFound from "tools/components/NotFound";

import { ROUTE_ADMIN_USER_USERS, ROUTE_ADMIN_USER_REGISTRATIONS } from "constants/routes";

const UserRouter = () => (
  <Switch>
    <Route path={ROUTE_ADMIN_USER_USERS} component={Users}/>
    <Route path={ROUTE_ADMIN_USER_REGISTRATIONS} component={Registrations}/>

    <Route component={NotFound}/>
  </Switch>
);

export default UserRouter;