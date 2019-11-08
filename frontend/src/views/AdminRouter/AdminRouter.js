import React from "react";

import { Switch, Route } from "react-router-dom";

import { AdminRoleRoute } from "tools/components/routes";

import { ROLE_USER_MANAGER, ROLE_ORGANIZATION_MANAGER, ROLE_PACKAGE_MANAGER, ROLE_SECTOR_MANAGER, ROLE_TEMPLATE_MANAGER} from "constants/roles";
import { ROUTE_ADMIN_USER, ROUTE_ADMIN_ORGANIZATION, ROUTE_ADMIN_TEMPLATE, ROUTE_ADMIN_PACKAGE, ROUTE_ADMIN_SECTOR } from "constants/routes";

import TemplateRouter from "./TemplateRouter";
import OrganizationRouter from "./OrganizationRouter";
import UserRouter from "./UserRouter";
import SectorRouter from "./SectorRouter";
import PackageRouter from "./PackageRouter";
import NotFound from "tools/components/NotFound";

const AdminRouter = () => (
  <Switch>
    <AdminRoleRoute path={ROUTE_ADMIN_USER} requiredRole={ROLE_USER_MANAGER} Component={UserRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_SECTOR} requiredRole={ROLE_SECTOR_MANAGER} Component={SectorRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_PACKAGE} requiredRole={ROLE_PACKAGE_MANAGER} Component={PackageRouter}/>
    <AdminRoleRoute path={ROUTE_ADMIN_ORGANIZATION} requiredRole={ROLE_ORGANIZATION_MANAGER} Component={OrganizationRouter}/> */}
    <AdminRoleRoute path={ROUTE_ADMIN_TEMPLATE} requiredRole={ROLE_TEMPLATE_MANAGER} Component={TemplateRouter}/>

    <Route component={NotFound}/>
  </Switch>
);

export default AdminRouter;