import React from "react";

import { Switch, Route } from "react-router-dom";

import NotFound from "@tools/components/NotFound";

import SubmissionPeriods from './SubmissionPeriods'
import Submissions from './Submissions'

const SubmissionRouter = () => (
  <Switch>
    <Route exact path="/submission_manager/submissionPeriods" component={SubmissionPeriods}/>
    <Route exact path="/submission_manager/submissions" component={Submissions}/>

    <Route component={NotFound}/>
  </Switch>
);

export default SubmissionRouter;