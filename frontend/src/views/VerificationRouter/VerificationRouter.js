import React, { lazy } from "react";

import { Route, Switch } from "react-router-dom";

import { ROUTE_VERIFICATION_VERIFICATION } from "constants/routes";

const Verification = lazy(() => import("./Verification"));

import NotFound from "tools/components/NotFound";

const VerificationRouter = () => (
  <Switch>
    <Route exact path={ROUTE_VERIFICATION_VERIFICATION} component={Verification}/>

    <Route component={NotFound}/>
  </Switch>
);

export default VerificationRouter;