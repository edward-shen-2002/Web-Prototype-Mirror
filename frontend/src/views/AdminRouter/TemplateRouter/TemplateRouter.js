import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

// import NotFound from "@tools/components/NotFound";

import Template from './Template/Template'
import Templates from './Templates/Templates'
import TemplateTypes from './TemplateTypes'
import Statuses from "./Statuses";
import TemplatePackages from './TemplatePackages'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/designer/template" component={Templates}/>
    <Route path="/designer/template/:_id" component={Template}/>
    <Route path="/designer/templateType" component={TemplateTypes}/>
    <Route path="/designer/status" component={Statuses}/>
    <Route path="/designer/templatePackage" component={TemplatePackages}/>

    {/* NOT FOUND ROUTE */}
  </Switch>
);

export default TemplateRouter;