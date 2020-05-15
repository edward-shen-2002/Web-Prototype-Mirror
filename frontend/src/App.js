import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

import { ActivityRoute } from "@tools/components/routes";
import TemplateRouter from "./views/TemplateRouter";
import COARouter from './views/COARouter'
import Navigation from './Navigation'
import Header from './Header'
import Statuses from './views/Statuses'
import SheetNames from './views/SheetNames'
import AppSysRouter from './views/AppSysRouter'

import './App.scss'

const AppPageRouter = () => {
  let isOnline = useSelector(
    (
      {
        app: {
          isOnline
        }
      }
    ) => isOnline,
    shallowEqual
  )

  // ! For testing purposes
  isOnline = true

  return (
    <Switch>
      <Route
        exact path="/"
        component={
          (props) => (
            isOnline
              ? <Redirect to="/template_manager/templates" />
              : <Login {...props} />
          )
        }
      />
      <ActivityRoute path="/template_manager" requiredState="online" Component={TemplateRouter} />
      <ActivityRoute path="/COA_manager" requiredState="online" Component={COARouter} />
      <ActivityRoute path="/sheetNames" requiredState="online" Component={SheetNames} />
      <ActivityRoute path="/appsys_manager" requiredState="online" Component={AppSysRouter} />
      <ActivityRoute path="/statuses" requiredState="online" Component={Statuses} />
    </Switch>
  )
}

const AppPage = ({ isAppNavigationOpen }) => {

  return (
    <div className="app__page app__page--online">
      {isAppNavigationOpen && <Navigation />}
      <AppPageRouter />
    </div>
  )
}

const AppContent = () => {
  const isAppNavigationOpen = useSelector(
    (
      {
        ui: {
          isAppNavigationOpen
        }
      }
    ) => isAppNavigationOpen,
    shallowEqual
  )

  return (
    <div className="app">
      {isAppNavigationOpen && <Header />}
      <AppPage isAppNavigationOpen={isAppNavigationOpen} />
    </div>
  )
}

const App = () => (
  <div className="appContainer">
    <AppContent />
  </div>
)

export default App