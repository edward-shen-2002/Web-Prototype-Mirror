import React from "react";

import { connect } from "react-redux";

import { Switch, Route } from "react-router-dom";

import { PrivillegedRoute } from "tools/routes";

import { ONLINE, OFFLINE } from "constants/states";
import { ROUTE_ROOT, ROUTE_DASHBOARD, ROUTE_LOGIN } from "constants/routes";

import Home from "./views/Home";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";

import Navigation from "./navigation";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const AppContent = ({ isOnline }) => (
  <Switch>
    <Route exact path={ROUTE_ROOT} component={Home}/>

    <PrivillegedRoute isOnline={isOnline} path={ROUTE_LOGIN} requiredState={OFFLINE} Component={Login}/>
    <PrivillegedRoute isOnline={isOnline} path={ROUTE_DASHBOARD} requiredState={ONLINE} Component={Dashboard}/>
    
    <Route component={NotFound}/>
  </Switch>
);

const mapStateToProps = ({ app: { isOnline } }) => ({ isOnline });

let App = ({ isOnline }) => {
  return (
    <div>
      <Navigation/>
      <AppContent isOnline={isOnline}/>
    </div>
  );
};

App = connect(mapStateToProps)(App);

export default App;