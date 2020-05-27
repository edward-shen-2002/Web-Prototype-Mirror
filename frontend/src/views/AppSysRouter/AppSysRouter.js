import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NotFound from '../..//components/NotFound' 
import AppSyses from './AppSyses'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/appsys_manager/AppSyses" component={AppSyses} />
    <Route component={NotFound} />
  </Switch>
)

export default TemplateRouter
