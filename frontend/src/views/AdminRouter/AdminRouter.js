import React from "react";

import { Switch, Route } from "react-router-dom";

import { AdminRoleRoute } from "@tools/components/routes";

import { 
  ROLE_USER_MANAGER, 
  ROLE_ORGANIZATION_MANAGER, 
  ROLE_BUNDLE_MANAGER, 
  ROLE_SECTOR_MANAGER, 
  ROLE_TEMPLATE_MANAGER,
  ROLE_DATA_ENTITY_MANAGER
} from "@constants/roles";

import { 
  ROUTE_ADMIN_USER, 
  ROUTE_ADMIN_ORGANIZATION, 
  ROUTE_ADMIN_TEMPLATE, 
  ROUTE_ADMIN_BUNDLE, 
  ROUTE_ADMIN_SECTOR,
  ROUTE_ADMIN_DATA_ENTITY
} from "@constants/routes";

import TemplateRouter from "./TemplateRouter";
import OrganizationRouter from "./OrganizationRouter";
import UserRouter from "./UserRouter";
import SectorRouter from "./SectorRouter";
import BundleRouter from "./BundleRouter";
import DataEntityRouter from "./DataEntityRouter";

import NotFound from "@tools/components/NotFound";

const AdminRouter = () => (
  <Switch>
    <AdminRoleRoute path={ROUTE_ADMIN_USER} requiredRole={ROLE_USER_MANAGER} Component={UserRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_SECTOR} requiredRole={ROLE_SECTOR_MANAGER} Component={SectorRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_BUNDLE} requiredRole={ROLE_BUNDLE_MANAGER} Component={BundleRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_ORGANIZATION} requiredRole={ROLE_ORGANIZATION_MANAGER} Component={OrganizationRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_TEMPLATE} requiredRole={ROLE_TEMPLATE_MANAGER} Component={TemplateRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_DATA_ENTITY} requiredRole={ROLE_DATA_ENTITY_MANAGER} Component={DataEntityRouter}/>

    <Route component={NotFound}/>
  </Switch>
);

export default AdminRouter;