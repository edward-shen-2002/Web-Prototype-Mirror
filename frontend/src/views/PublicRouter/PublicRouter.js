import React, { lazy } from "react";
import NotFound from "@tools/components/NotFound";
import { ROUTE_PUBLIC_LOGIN, ROUTE_PUBLIC_REGISTER, ROUTE_PUBLIC_PREREGISTER, ROUTE_PUBLIC_RECOVERY } from "@constants/routes";
import { Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./Login"));
const Preregister = lazy(() => import("./Preregister"));
const Register = lazy(() => import("../../controller"));
const Recovery = lazy(() => import("./Recovery"));

const PublicRouter = () => (
  <Switch>
    <Route exact path={ROUTE_PUBLIC_LOGIN} component={Login}/>
      <Route exact path={ROUTE_PUBLIC_PREREGISTER} component={Preregister}/>
    <Route exact path={ROUTE_PUBLIC_REGISTER} component={Register}/>
    <Route exact path={ROUTE_PUBLIC_RECOVERY} component={Recovery}/>

    <Route component={NotFound}/>
  </Switch>
);

export default PublicRouter;