import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

const Templates = lazy(() => import("./Templates"));
const Template = lazy(() => import("./Template"));

import NotFound from "tools/components/NotFound";

import { ROUTE_ADMIN_TEMPLATE_TEMPLATE,ROUTE_ADMIN_TEMPLATE_TEMPLATES } from "constants/routes";

const TemplateRouter = () => (
  <Switch>
    <Route exact path={ROUTE_ADMIN_TEMPLATE_TEMPLATES} component={Templates}/>
    <Route path={ROUTE_ADMIN_TEMPLATE_TEMPLATE} component={Template}/>

    <Route component={NotFound}/>
  </Switch>
);

export default TemplateRouter;