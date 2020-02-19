import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import { 
  ROUTE_ADMIN_DATA_ENTITY_BUSINESS_CONCEPTS,
  ROUTE_ADMIN_DATA_ENTITY_GROUPS
} from "@constants/routes";

const BusinessConcepts = lazy(() => import("./BusinessConcepts"));
const Groups = lazy(() => import("./Groups"));

const DataEntityRouter = () => (
  <Switch>
    <Route exact path={ROUTE_ADMIN_DATA_ENTITY_BUSINESS_CONCEPTS} component={BusinessConcepts}/>
    <Route path={ROUTE_ADMIN_DATA_ENTITY_BUSINESS_CONCEPTS} component={BusinessConcepts}/>
    <Route path={ROUTE_ADMIN_DATA_ENTITY_GROUPS} component={Groups}/>
    
    <Route component={NotFound}/>
  </Switch>
);

export default DataEntityRouter;