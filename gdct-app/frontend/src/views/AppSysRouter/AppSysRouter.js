import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NotFound from '../../components/NotFound'
import AppSyses from './AppSyses'
import AppSysRoles from './AppSysRoles'
import AppRoles from './AppRoles'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/appsys_manager/AppSyses" component={AppSyses} />
    <Route exact path="/appsys_manager/AppSysRoles" component={AppSysRoles} />
    <Route exact path="/appsys_manager/AppRoles" component={AppRoles} />
    <Route component={NotFound} />
  </Switch>
)

export default TemplateRouter
