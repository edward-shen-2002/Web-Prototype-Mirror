import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NotFound from '../../components/NotFound'

import SubmissionPeriods from './SubmissionPeriods'
import Submissions from './Submissions'
import Submission from './Submission'
import SubmissionDashboard from "./SubmissionDashboard";
import CreateSubmission from "./CreateSubmission";
import EditSubmission from "./EditSubmission"

const SubmissionRouter = () => (
  <Switch>
    <Route
      exact
      path="/submission_manager/submissionPeriods"
      component={SubmissionPeriods}
    />
    <Route
      exact
      path="/submission_manager/submissions"
      component={Submissions}
    />
    <Route
      exact
      path="/submission_manager/submissions/:_id"
      component={Submission}
    />
    <Route exact path="/submission_manager/submission" component={Submission} />

    <Route
      exact
      path="/submission_manager/dashboard"
      component={SubmissionDashboard}
    />

    <Route
      exact
      path="/submission_manager/createSubmission/:id"
      component={CreateSubmission}
    />

      <Route
        exact
        path="/submission_manager/editSubmission/:id"
        component={EditSubmission}
      />

    <Route component={NotFound} />
  </Switch>
)

export default SubmissionRouter
