import React from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

const TemplateRouter = () => (
  <Switch>
    

    <Route component={NotFound}/>
  </Switch>
);

export default TemplateRouter;