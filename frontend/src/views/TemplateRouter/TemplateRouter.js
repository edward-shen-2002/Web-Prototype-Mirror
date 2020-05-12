import React from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import Template from './Template/Template'
import Templates from './Templates/Templates'
import TemplateTypes from './TemplateTypes'
import TemplatePackages from './TemplatePackages'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/template_manager/templates" component={Templates}/>
    <Route path="/template_manager/template/:_id" component={Template}/>
    <Route path="/template_manager/templateType" component={TemplateTypes}/>
    <Route path="/template_manager/templatePackage" component={TemplatePackages}/>

    <Route component={NotFound}/>
  </Switch>
);

export default TemplateRouter;