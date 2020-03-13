import React, { lazy } from "react";
import NotFound from "@tools/components/NotFound";
import { ROUTE_PUBLIC_LOGIN, ROUTE_PUBLIC_REGISTER_STEP1, ROUTE_PUBLIC_REGISTER_STEP2, ROUTE_PUBLIC_REGISTER_STEP3, ROUTE_PUBLIC_REGISTER, ROUTE_PUBLIC_PREREGISTER, ROUTE_PUBLIC_RECOVERY } from "@constants/routes";
import { Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./Login"));
const Preregister = lazy(() => import("./Preregister"));
const Register = lazy(() => import("./Register"));
const RegisterStep1 = lazy(() => import("./Register/step1"));
const RegisterStep2 = lazy(() => import("./Register/step2"));
const RegisterStep3 = lazy(() => import("./Register/step3"));
const Recovery = lazy(() => import("./Recovery"));

const PublicRouter = () => (
  <Switch>
    <Route exact path={ROUTE_PUBLIC_LOGIN} component={Login}/>
      <Route exact path={ROUTE_PUBLIC_PREREGISTER} component={Preregister}/>
    <Route exact path={ROUTE_PUBLIC_REGISTER} component={Register}/>
    <Route exact path={ROUTE_PUBLIC_REGISTER_STEP1} component={RegisterStep1}/>
    <Route exact path={ROUTE_PUBLIC_REGISTER_STEP2} component={RegisterStep2}/>
    <Route exact path={ROUTE_PUBLIC_REGISTER_STEP3} component={RegisterStep3}/>
    <Route exact path={ROUTE_PUBLIC_RECOVERY} component={Recovery}/>

    <Route component={NotFound}/>
  </Switch>
);

export default PublicRouter;