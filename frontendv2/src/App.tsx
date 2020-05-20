import React from "react";

import { BrowserRouter, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import Login from './views/PublicRouter/Login'
import TemplateRouter from "./views/TemplateRouter";
import COARouter from './views/COARouter'
import Statuses from './views/Statuses'
import SheetNames from './views/SheetNames'
import AppSysRouter from './views/AppSysRouter'

// No authentication for now
const AppPage = ({ isOnline = true }) => (
  <Switch>
    <Route
      exact path="/"
      component={
        (props: RouteComponentProps) => (
          isOnline
            ? <Redirect to="/template_manager/templates" />
            : <Login {...props} />
        )
      }
    />
    <Route path="/template_manager" component={TemplateRouter}/>
    <Route path="/COA_manager" component={COARouter}/>
    <Route path="/sheetNames" component={SheetNames}/>
    <Route path="/appsys_manager" component={AppSysRouter}/>
    <Route path="/statuses" component={Statuses}/>
  </Switch>
)

const App = () => (
  <BrowserRouter>
    <Route path="/" component={AppPage}/>
  </BrowserRouter>
);

export default App;
