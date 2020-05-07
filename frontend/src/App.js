import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'

import { ActivityRoute } from "@tools/components/routes";
import TemplateRouter from "./views/AdminRouter/TemplateRouter";
import Navigation from './Navigation'
import Header from './Header'

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
              ? <Redirect to="/designer/template"/> 
              : <Login {...props}/> 
          )
        }
      />
      <ActivityRoute path="/designer" requiredState="online" Component={TemplateRouter}/>
    </Switch>
  )
}

const AppPage = ({ isAppNavigationOpen }) => {

  return (
    <div className="app__page app__page--online">
      { isAppNavigationOpen && <Navigation/> }
      <AppPageRouter/>
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
      { isAppNavigationOpen && <Header/> }
      <AppPage isAppNavigationOpen={isAppNavigationOpen}/>
    </div>
  )
}

const App = () => (
  <div className="appContainer">
    <AppContent/>
  </div>
)

export default App