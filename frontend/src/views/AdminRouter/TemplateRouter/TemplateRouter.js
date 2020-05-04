import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import Template from './Template/TemplateV2'
import Templates from './Templates/Templatesv2'
// import TemplateType from './TemplateTypes'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/designer/template" component={Templates}/>
    <Route path="/designer/template/:_id" component={Template}/>
    {/* <Route path="/template_manager/type" component={TemplateType}/> */}
  </Switch>
);

export default TemplateRouter;