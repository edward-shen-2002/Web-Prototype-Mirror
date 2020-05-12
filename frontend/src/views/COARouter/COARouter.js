import React from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";
import COATrees from "./COATrees";
import COATree from "./COATree";
import COAGroups from './COAGroups'
import COAs from './COAs'

const TemplateRouter = () => (
  <Switch>
    <Route path="/COA_manager/COA_groups" component={COAGroups}/>
    <Route path="/COA_manager/COAs" component={COAs}/>
    <Route path="/COA_manager/COA_trees" component={COATrees}/>
    <Route path="/COA_manager/COA_tree" component={COATree}/>

    <Route component={NotFound}/>
  </Switch>
);

export default TemplateRouter;