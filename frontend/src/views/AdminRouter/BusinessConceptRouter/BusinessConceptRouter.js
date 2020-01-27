import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import { 
  ROUTE_ADMIN_BUSINESS_CONCEPT_BUSINESS_CONCEPTS
} from "@constants/routes";

const BusinessConcepts = lazy(() => import("./BusinessConcepts"));

const BusinessConceptRouter = () => (
  <Switch>
    <Route exact path={ROUTE_ADMIN_BUSINESS_CONCEPT_BUSINESS_CONCEPTS} component={BusinessConcepts}/>
    <Route path={ROUTE_ADMIN_BUSINESS_CONCEPT_BUSINESS_CONCEPTS} component={BusinessConcepts}/>
    {/* IMPORT BUSINESS CONCEPT HERE */}
    
    <Route component={NotFound}/>
  </Switch>
);

export default BusinessConceptRouter;