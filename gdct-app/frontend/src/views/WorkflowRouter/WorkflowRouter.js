import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ROUTE_WORKFLOW_WORKFLOWS } from '../../constants/routes'
import Workflow from './Workflow'

const WorkflowRouter = () => (
  <Switch>
    <Route
      path={ROUTE_WORKFLOW_WORKFLOWS}
      component={Workflow}
    />
  </Switch>
)

export default WorkflowRouter