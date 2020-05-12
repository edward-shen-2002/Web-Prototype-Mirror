import React from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";
// import COATrees from "./COATree/COATrees";
import COATree from "./COATree/COATree";

const TemplateRouter = () => (
  <Switch>
    {/* <Route path="/COA_manager/COA_trees" component={COATrees}/> */}
    <Route path="/COA_manager/COA_tree" component={COATree}/>

    <Route component={NotFound}/>
  </Switch>
);

export default TemplateRouter;