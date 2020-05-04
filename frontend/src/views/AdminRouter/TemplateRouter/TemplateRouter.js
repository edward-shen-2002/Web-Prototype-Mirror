import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import Template from './Template/TemplateV2'
import Templates from './Templates/Templatesv2'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/" component={Templates}/>
    <Route path="/templates/:_id" component={Template}/>
  </Switch>
);

export default TemplateRouter;