import React, { lazy } from "react";

import { ROUTE_PUBLIC_LOGIN, ROUTE_PUBLIC_REGISTER, ROUTE_PUBLIC_RECOVERY } from "constants/routes";

import { Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Recovery = lazy(() => import("./Recovery"));

import NotFound from "tools/components/NotFound";

const PublicRouter = () => (
  <Switch>
    <Route exact path={ROUTE_PUBLIC_LOGIN} component={Login}/>
    <Route exact path={ROUTE_PUBLIC_REGISTER} component={Register}/>
    <Route exact path={ROUTE_PUBLIC_RECOVERY} component={Recovery}/>

    <Route component={NotFound}/>
  </Switch>
);

export default PublicRouter;