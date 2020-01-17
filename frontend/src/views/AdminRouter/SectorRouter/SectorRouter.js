import React, { lazy } from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import { ROUTE_ADMIN_SECTOR_SECTORS } from "@constants/routes";

const Sectors = lazy(() => import("./Sectors"));

const SectorRouter = () => (
  <Switch>
    <Route exact path={ROUTE_ADMIN_SECTOR_SECTORS} component={Sectors}/>

    <Route component={NotFound}/>
  </Switch>
);

export default SectorRouter;