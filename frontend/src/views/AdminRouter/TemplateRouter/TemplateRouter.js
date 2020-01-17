import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import { 
  ROUTE_ADMIN_TEMPLATE_TEMPLATE,
  ROUTE_ADMIN_TEMPLATE_TEMPLATES,
  ROUTE_ADMIN_TEMPLATE_BUSINESS_CONCEPTS
} from "@constants/routes";

const Templates = lazy(() => import("./Templates"));
const Template = lazy(() => import("./Template"));
const BusinessConcepts = lazy(() => import("./BusinessConcepts"));

const TemplateRouter = () => (
  <Switch>
    <Route exact path={ROUTE_ADMIN_TEMPLATE_TEMPLATES} component={Templates}/>
    <Route path={ROUTE_ADMIN_TEMPLATE_TEMPLATE} component={Template}/>
    <Route path={ROUTE_ADMIN_TEMPLATE_BUSINESS_CONCEPTS} component={BusinessConcepts}/>
    
    <Route component={NotFound}/>
  </Switch>
);

export default TemplateRouter;