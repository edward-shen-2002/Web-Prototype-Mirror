import React, { lazy, useEffect, useMemo, Suspense } from "react";

import { connect } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { loadUserState, resetUserState } from "tools/redux";
import { authAxios, adminUserRoleAxios, adminOrganizationRoleAxios } from "tools/rest";
import { findAndSaveToken } from "tools/storage";
import { PrivillegedRoute } from "tools/routes";

import { ONLINE, OFFLINE } from "constants/states";
import { ROLE_USER_MANAGER, ROLE_DATA_MANAGER, ROLE_ORGANIZATION_MANAGER } from "constants/roles";
import { REST_RECONNECT, HTTP_ERROR_INVALID_TOKEN, HTTP_ERROR_UNAUTHORIZED } from "constants/rest";
import { ROUTE_ROOT, ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_REGISTER, ROUTE_RECOVERY, ROUTE_ADMIN_USER_USERS, ROUTE_ADMIN_DATA_DATAGROUPS, ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS } from "constants/routes";

import Navigation from "./navigation";
import AppHeader from "./header";
import Loading from "./Loading";

const Login = lazy(() => import("./views/public/Login"));
const Register = lazy(() => import("./views/public/Register"));
const Recovery = lazy(() => import("./views/public/Recovery"));

const Users = lazy(() => import("./views/admin/Users"));
const DataGroup = lazy(() => import("./views/admin/DataGroup"));
const Organizations = lazy(() => import("./views/admin/Organizations"));

const NotFound = lazy(() => import("./views/misc/NotFound"));

const Dashboard = lazy(() => import("./views/user/Dashboard"));
const Profile = lazy(() => import("./views/user/Profile"));

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const AppPageContent = ({ isOnline }) => (
  <Suspense fallback={<Loading/>}>
    <Switch>
      <Route exact path={ROUTE_ROOT} component={(props) => isOnline ? <Redirect to={ROUTE_DASHBOARD}/> : <Login {...props} />}/>

      <PrivillegedRoute path={ROUTE_LOGIN} requiredState={OFFLINE} Component={Login}/>
      <PrivillegedRoute path={ROUTE_REGISTER} requiredState={OFFLINE} Component={Register}/>
      <PrivillegedRoute path={ROUTE_RECOVERY} requiredState={OFFLINE} Component={Recovery}/>
      <PrivillegedRoute path={ROUTE_DASHBOARD} requiredState={ONLINE} Component={Dashboard}/>
      <PrivillegedRoute path={ROUTE_PROFILE} requiredState={ONLINE} Component={Profile}/>

      {/* Admin Routes */}
      <PrivillegedRoute path={ROUTE_ADMIN_USER_USERS} requiredState={ONLINE} requiredRole={ROLE_USER_MANAGER} Component={Users}/>
      <PrivillegedRoute path={ROUTE_ADMIN_DATA_DATAGROUPS} requiredState={ONLINE} requiredRole={ROLE_DATA_MANAGER} Component={DataGroup}/>
      <PrivillegedRoute path={ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS} requiredState={ONLINE} requiredRole={ROLE_ORGANIZATION_MANAGER} Component={Organizations}/>

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
    authAxios.post(REST_RECONNECT)
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

    // Redirect to dashboard when the user is not authorized... 
    // TODO: Possibly fetch user data again since this may indicate that the user has an outdated server resource - Will be impossible if the token is invalid... Check if server sent back user data. Logout if invalid token
    const adminErrorMiddleware = (error) => {
      const { response: { status } } = error;
      if(status === HTTP_ERROR_INVALID_TOKEN) {
        handleLogout();
      } else if(status === HTTP_ERROR_UNAUTHORIZED) {
        history.push("/dashboard");
      }
      return Promise.reject(error);
    };

    const setMiddleware = (routeAxios, middleware) => routeAxios.interceptors.response.use(null, middleware);

    if(isOnline) {
      setMiddleware(authAxios, authErrorMiddleware);
      setMiddleware(adminUserRoleAxios, adminErrorMiddleware);
      setMiddleware(adminOrganizationRoleAxios, adminErrorMiddleware);
    }
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