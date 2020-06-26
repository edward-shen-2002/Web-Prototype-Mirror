import React, { useState, useEffect } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import { CircularProgress, Grid } from '@material-ui/core'
import TemplateRouter from './views/TemplateRouter'
import COARouter from './views/COARouter'
import AuthPage from './components/AuthPage'
import Statuses from './views/Statuses'
import SheetNames from './views/SheetNames'
import RoleRouter from './views/RoleRouter'
import SubmissionRouter from './views/SubmissionRouter'
import ReportingPeriods from './views/ReportingPeriods'
import UserController from './controllers/User'

import './App.scss'
import Login from './views/Login'
import { ROUTE_WORKFLOW } from './constants/routes'
import WorkflowRouter from './views/WorkflowRouter/WorkflowRouter'
import SignUp from './views/SignUp'

const PrivateRouter = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={(props) =>
          isOnline ? (
            // <Redirect to="/template_manager/templates" />
            <Redirect to="/sheetNames" />
          ) : (
            <Login {...props} />
          )
        }
      />
      <Route path={ROUTE_WORKFLOW} component={WorkflowRouter} />
      <Route path="/template_manager" component={TemplateRouter} />
      <Route path="/COA_manager" component={COARouter} />
      <Route path="/role_manager" component={RoleRouter} />
      <Route path="/statuses" component={Statuses} />
      <Route path="/submission_manager" component={SubmissionRouter} />
      <Route path="/reportingPeriods" component={ReportingPeriods} />
      <Route path="/sheetNames" component={SheetNames} />
      <Redirect from="*" to="/sheetNames" />
    </Switch>
  )
}
const PublicRouter = ({ setLoggedIn }) => {
  return (
    <Switch>
      <Route
        path="/login"
        render={(props) => <Login {...props} setLoggedIn={setLoggedIn} />}
      />
      <Route path="/signup" component={SignUp} />
      <Redirect from="*" to="/login" />
    </Switch>
  )
}

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(null)
  useEffect(() => {
    UserController.profile()
      .then((res) => {
        setLoggedIn(res.status === 'success')
      })
      .catch(() => {
        setLoggedIn(false)
      })
  }, [])

  return (
    <div className="appContainer">
      {isLoggedIn === null ? (
        <Grid
          container
          style={{ height: '100vh' }}
          justify="center"
          alignContent="center"
        >
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      ) : isLoggedIn ? (
        <AuthPage>
          <PrivateRouter />
        </AuthPage>
      ) : (
        <PublicRouter setLoggedIn={setLoggedIn} />
      )}
    </div>
  )
}

export default App
