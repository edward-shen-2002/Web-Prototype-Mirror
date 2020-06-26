import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NotFound from '../../components/NotFound'
import AppSyses from './AppSyses'
import AppSysRoles from './AppSysRoles'
import AppRoles from './AppRoles'
import AppResources from './AppResources'
import AppRoleResources from './AppRoleResources'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/role_manager/AppSyses" component={AppSyses} />
    <Route exact path="/role_manager/AppSysRoles" component={AppSysRoles} />
    <Route exact path="/role_manager/AppRoles" component={AppRoles} />
    <Route exact path="/role_manager/AppResources" component={AppResources} />
    <Route
      exact
      path="/role_manager/AppRoleResources"
      component={AppRoleResources}
    />
    <Route component={NotFound} />
  </Switch>
)

export default TemplateRouter
