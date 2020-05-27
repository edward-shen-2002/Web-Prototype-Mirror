import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NotFound from '../..//components/NotFound'

import Template from './Template/Template'
import Templates from './Templates/Templates'
import TemplateTypes from './TemplateTypes'
import TemplatePackages from './TemplatePackages'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/template_manager/templates" component={Templates} />
    <Route exact path="/template_manager/templates/:_id" component={Template} />
    <Route
      exact
      path="/template_manager/templateTypes"
      component={TemplateTypes}
    />
    <Route
      exact
      path="/template_manager/templatePackages"
      component={TemplatePackages}
    />

    <Route component={NotFound} />
  </Switch>
)

export default TemplateRouter
