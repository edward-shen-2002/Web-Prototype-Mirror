import React, { lazy, useEffect, Suspense } from "react";

import { connect } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { loadUserState } from "tools/redux";
import { authAxios } from "tools/rest";
import { findAndSaveToken } from "tools/storage";
import { PrivillegedRoute } from "tools/routes";

import { ONLINE, OFFLINE } from "constants/states";
import { REST_GET_RECONNECT } from "constants/rest";
import { ROUTE_ROOT, ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RECOVERY } from "constants/routes";

import Navigation from "./navigation";
import AppHeader from "./header";

import Login from "./views/Login";
import Register from "./views/Register";

import Recovery from "./views/Recovery";
import NotFound from "./views/NotFound";

// Lazy load resource-consuming components
const Dashboard = lazy(() => import("./views/Dashboard"));
const Profile = lazy(() => import("./views/Profile"));

import Loading from "./Loading";

import "./App.scss";

const AppPageContent = ({ isOnline }) => (
  <Suspense fallback={<Loading/>}>
    <Switch>
      <Route exact path={ROUTE_ROOT} component={(props) => isOnline ? <Redirect to={ROUTE_DASHBOARD}/> : <Login {...props} />}/>

      <PrivillegedRoute isOnline={isOnline} path={ROUTE_LOGIN} requiredState={OFFLINE} Component={Login}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_REGISTER} requiredState={OFFLINE} Component={Register}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_RECOVERY} requiredState={OFFLINE} Component={Recovery}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_DASHBOARD} requiredState={ONLINE} Component={Dashboard}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_PROFILE} requiredState={ONLINE} Component={Profile}/>
      
      <Route component={NotFound}/>
    </Switch>
  </Suspense>
);

const AppPage = ({ isOnline, location, history }) => (
  <div className={`app__page ${isOnline ? "app__page--online" : "app_page--offline" }`}>
    {isOnline && <Navigation location={location} history={history}/>}
    <AppPageContent isOnline={isOnline}/>
  </div>
); 

const mapStateToProps = ({ app: { shouldReconnect, isOnline } }) => ({ shouldReconnect, isOnline });

const mapDispatchToProps = (dispatch) => ({
  reconnect: () => {
    authAxios.get(REST_GET_RECONNECT)
      .then(({ data: { data: { user } } }) => loadUserState(dispatch, user))
      .catch((error) => console.log("error", error));
  }
});

let App = ({ shouldReconnect, isOnline, reconnect, location, history }) => {
  //Send a request to server with user's saved token, essentially login without replacing token
  findAndSaveToken();

  useEffect(() => {
    if(shouldReconnect) reconnect();
  }, [ shouldReconnect ]);

  const className = `app ${isOnline ? "app--online" : "app-offline"}`;

  return (
    <div className={className}>
      {isOnline && <AppHeader/>}
      <AppPage isOnline={isOnline} location={location} history={history}/>
    </div>
  );
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;