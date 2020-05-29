import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NotFound from '../..//components/NotFound'

import SubmissionPeriods from './SubmissionPeriods'
import Submissions from './Submissions'
import Submission from './Submission'

const SubmissionRouter = () => (
  <Switch>
    <Route
      exact
      path="/submission_manager/submissionPeriods"
      component={SubmissionPeriods}
    />
    {/* <Route
      exact
      path="/submission_manager/submissions"
      component={Submissions}
    />
    <Route
      exact
      path="/submission_manager/submissions/:_id"
      component={Submission}
    /> */}
    <Route exact path="/submission_manager/submission" component={Submission} />

    <Route component={NotFound} />
  </Switch>
)

export default SubmissionRouter
