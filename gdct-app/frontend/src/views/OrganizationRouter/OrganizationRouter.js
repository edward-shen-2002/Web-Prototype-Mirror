import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NotFound from '../../components/NotFound'
import Organizations from './Organizations'
import CreateOrganization from './CreateOrganization'
import EditOrganization from './EditOrganization'
/*
List Child views here
*/

const OrgRouter = () => (
  <Switch>
    <Route exact path="/organizations/edit/:_id" component={EditOrganization} />
    <Route exact path="/organizations/create" component={CreateOrganization} />
    <Route exact path="/organizations" component={Organizations} />

    <Route component={NotFound} />
  </Switch>
)

export default OrgRouter
