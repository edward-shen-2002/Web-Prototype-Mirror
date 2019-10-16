import React, { lazy, useEffect, useMemo, Suspense } from "react";

import { connect } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { loadUserState, resetUserState } from "tools/redux";
import { authAxios } from "tools/rest";
import { findAndSaveToken } from "tools/storage";
import { PrivillegedRoute } from "tools/routes";

import { ONLINE, OFFLINE } from "constants/states";
import { REST_POST_RECONNECT, HTTP_ERROR_INVALID_TOKEN } from "constants/rest";
import { ROUTE_ROOT, ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RECOVERY, ROUTE_ADMIN_USERS } from "constants/routes";

import Navigation from "./navigation";
import AppHeader from "./header";

import Login from "./views/Login";
import Register from "./views/Register";

import Users from "./views/Users/Users";

import Recovery from "./views/Recovery";
import NotFound from "./views/NotFound";

// Lazy load resource-consuming components
const Dashboard = lazy(() => import("./views/Dashboard"));
const Profile = lazy(() => import("./views/Profile"));

import Loading from "./Loading";


import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const AppPageContent = ({ isOnline }) => (
  <Suspense fallback={<Loading/>}>
    <Switch>
      <Route exact path={ROUTE_ROOT} component={(props) => isOnline ? <Redirect to={ROUTE_DASHBOARD}/> : <Login {...props} />}/>

      <PrivillegedRoute isOnline={isOnline} path={ROUTE_LOGIN} requiredState={OFFLINE} Component={Login}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_REGISTER} requiredState={OFFLINE} Component={Register}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_RECOVERY} requiredState={OFFLINE} Component={Recovery}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_DASHBOARD} requiredState={ONLINE} Component={Dashboard}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_PROFILE} requiredState={ONLINE} Component={Profile}/>
      <PrivillegedRoute isOnline={isOnline} path={ROUTE_ADMIN_USERS} requiredState={ONLINE} Component={Users}/>
      
      <Route component={NotFound}/>
    </Switch>
  </Suspense>
);

const AppPage = ({ isOnline, account: { roles }, location, history }) => (
  <div className={`app__page ${isOnline ? "app__page--online" : "app_page--offline" }`}>
    {isOnline && <Navigation location={location} history={history} roles={roles}/>}
    <AppPageContent isOnline={isOnline}/>
  </div>
); 

const mapStateToProps = ({ app: { shouldReconnect, isOnline }, domain: { account } }) => ({ shouldReconnect, isOnline, account });

const mapDispatchToProps = (dispatch) => ({
  handleReconnect: () => {
    authAxios.post(REST_POST_RECONNECT)
      .then(({ data: { data } }) => loadUserState(dispatch, data))
      .catch((error) => console.error(error));
  },
  handleLogout: () => resetUserState(dispatch)
});

let App = ({ shouldReconnect, isOnline, account, handleReconnect, handleLogout, location, history }) => {
  // Set up auth middleware - only shared information among all auth requests must be present here to ensure functionality
  // TODO : Check edge cases - Will 'isOnline' parameter work for all cases? When can it fail?
  useMemo(() => {
    const authErrorMiddleware = (error) => {
      const { response: { status } } = error;
      if(status === HTTP_ERROR_INVALID_TOKEN) handleLogout();
      return Promise.reject(error);
    };

    const setAuthMiddleware = () => authAxios.interceptors.response.use(null, authErrorMiddleware);

    if(isOnline) setAuthMiddleware();
  }, [ isOnline ]);

  //Send a request to server with user's saved token, essentially login without replacing token
  findAndSaveToken();

  useEffect(() => {
    if(shouldReconnect) handleReconnect();
  }, [ shouldReconnect ]);

  const className = `app ${isOnline ? "app--online" : "app-offline"}`;
  
  return (
    <div className={className}>
      {isOnline && <AppHeader history={history}/>}
      <AppPage isOnline={isOnline} location={location} history={history} account={account}/>
    </div>
  );
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;