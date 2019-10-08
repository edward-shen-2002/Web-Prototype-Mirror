import React, { useEffect } from "react";

import { connect } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { loadUserState } from "tools/redux";
import { authAxios } from "tools/rest";
import { findAndSaveToken } from "tools/storage";
import { PrivillegedRoute } from "tools/routes";

import { ONLINE, OFFLINE } from "constants/states";
import { REST_GET_RECONNECT } from "constants/rest";
import { ROUTE_ROOT, ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_RECOVERY } from "constants/routes";

import Login from "./views/Login";
import Register from "./views/Register";

import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Recovery from "./views/Recovery";

import Navigation from "./navigation";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const AppHeader = () => (
  <div>
    Header
  </div>
);

const AppPageContent = ({ isOnline }) => (
  <Switch>
    <Route exact path={ROUTE_ROOT} component={(props) => isOnline ? <Redirect to={ROUTE_DASHBOARD}/> : <Login {...props} />}/>

    <PrivillegedRoute isOnline={isOnline} path={ROUTE_LOGIN} requiredState={OFFLINE} Component={Login}/>
    <PrivillegedRoute isOnline={isOnline} path={ROUTE_REGISTER} requiredState={OFFLINE} Component={Register}/>
    <PrivillegedRoute isOnline={isOnline} path={ROUTE_DASHBOARD} requiredState={ONLINE} Component={Dashboard}/>
    <PrivillegedRoute isOnline={isOnline} path={ROUTE_RECOVERY} requiredState={OFFLINE} Component={Recovery}/>
    
    <Route component={NotFound}/>
  </Switch>
);

const AppPage = ({ isOnline }) => (
  <div>
    {isOnline && <AppHeader/>}
    <AppPageContent isOnline={isOnline}/>
  </div>
); 

const mapStateToProps = ({ app: { shouldReconnect, isOnline } }) => ({ shouldReconnect, isOnline });

const mapDispatchToProps = (dispatch) => ({
  reconnect: () => {
    authAxios.post(REST_GET_RECONNECT)
      .then(() => loadUserState(dispatch))
      .catch((error) => console.log("error", error));
  }
});

let App = ({ shouldReconnect, isOnline, reconnect }) => {
  //Send a request to server with user's saved token, essentially login without replacing token
  findAndSaveToken();

  useEffect(() => {
    if(shouldReconnect) reconnect();
  }, [ shouldReconnect ]);

  return (
    <div className="app">
      {isOnline && <Navigation/>}
      <AppPage isOnline={isOnline}/>
    </div>
  );
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;