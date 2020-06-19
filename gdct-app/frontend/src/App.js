import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

import TemplateRouter from './views/TemplateRouter'
import COARouter from './views/COARouter'
import AuthPage from './components/AuthPage'
import Statuses from './views/Statuses'
import Programs from './views/Programs'
import SheetNames from './views/SheetNames'
import AppSysRouter from './views/AppSysRouter'
import SubmissionRouter from './views/SubmissionRouter'
import ReportingPeriods from './views/ReportingPeriods'

import './App.scss'
import Login from './views/Login'

const AppPageRouter = () => {
  // ! For testing purposes
  const isOnline = true

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
      <Route path="/template_manager" component={TemplateRouter} />
      <Route path="/COA_manager" component={COARouter} />
      <Route path="/appsys_manager" component={AppSysRouter} />
      <Route path="/statuses" component={Statuses} />
      <Route path="/programs" component={Programs} />
      <Route path="/submission_manager" component={SubmissionRouter} />
      <Route path="/reportingPeriods" component={ReportingPeriods} />
      <Route path="/sheetNames" component={SheetNames} />
      <Route path="/login" component={Login} />
    </Switch>
  )
}

const App = () => (
  <div className="appContainer">
    <AuthPage>
      <AppPageRouter />
    </AuthPage>
  </div>
)

export default App
