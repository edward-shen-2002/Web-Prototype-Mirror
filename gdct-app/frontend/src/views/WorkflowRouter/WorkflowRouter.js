import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTE_WORKFLOW_WORKFLOWS, ROUTE_WORKFLOW_WORKFLOWS_CREATE } from '../../constants/routes';
import Workflow from './Workflow';
import Workflows from './Workflows';

const WorkflowRouter = () => (
  <Switch>
    <Route
      exact
      path={ROUTE_WORKFLOW_WORKFLOWS_CREATE}
      render={routeProps => <Workflow {...routeProps} type="create" />}
    />
    <Route exact path={ROUTE_WORKFLOW_WORKFLOWS} component={Workflows} />
    <Route exact path={`${ROUTE_WORKFLOW_WORKFLOWS}/:_id`} component={Workflow} />
  </Switch>
);

export default WorkflowRouter;
