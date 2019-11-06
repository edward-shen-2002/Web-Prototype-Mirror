import React, { lazy, useEffect, useMemo, Suspense } from "react";

import { connect } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { loadUserState, resetUserState } from "tools/redux";
import { authAxios, adminUserRoleAxios, adminOrganizationRoleAxios, adminSectorRoleAxios } from "tools/rest";
import { findAndSaveToken } from "tools/storage";
import { PrivillegedRoute } from "tools/components/routes";

import { ONLINE, OFFLINE } from "constants/states";
import { ROLE_USER_MANAGER, ROLE_ORGANIZATION_MANAGER, ROLE_PACKAGE_MANAGER, ROLE_SECTOR_MANAGER, ROLE_TEMPLATE_MANAGER} from "constants/roles";
import { REST_AUTH_RECONNECT, HTTP_ERROR_INVALID_TOKEN, HTTP_ERROR_UNAUTHORIZED } from "constants/rest";
import { 
  ROUTE_ROOT, 
  ROUTE_DASHBOARD, 
  ROUTE_LOGIN, 
  ROUTE_PROFILE, 
  ROUTE_REGISTER, 
  ROUTE_VERIFICATION,
  ROUTE_RECOVERY, 
  ROUTE_ADMIN_USER_USERS, 
  ROUTE_ADMIN_USER_REGISTRATIONS,  
  ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS, 
  ROUTE_ADMIN_TEMPLATE_TEMPLATES,
  ROUTE_ADMIN_PACKAGE_PACKAGES,
  ROUTE_ADMIN_SECTOR_SECTORS
} from "constants/routes";

import Loading from "./Loading";

import Navigation from "./Navigation";

import AppHeader from "./Header";

// Public Views
const Login = lazy(() => import("./views/public/Login"));
const Register = lazy(() => import("./views/public/Register"));
const Verification = lazy(() => import("./views/public/Verification"));
const Recovery = lazy(() => import("./views/public/Recovery"));

// Admin Views
const Users = lazy(() => import("./views/admin/Users"));
const Registrations = lazy(() => import("./views/admin/Registrations"))
const Sectors = lazy(() => import("./views/admin/Sectors"));
const Organizations = lazy(() => import("./views/admin/Organizations"));
const Package = lazy(() => import("./views/admin/Package"));
const Templates = lazy(() => import("./views/admin/Templates"));

// User Views
const Dashboard = lazy(() => import("./views/user/Dashboard"));
const Profile = lazy(() => import("./views/user/Profile"));

// Misc Views
const NotFound = lazy(() => import("./views/misc/NotFound"));

import "./App.scss";

const AppPageContent = ({ isOnline }) => (
  <Suspense fallback={<Loading/>}>
    <Switch>
      {/* Default Route */}
      <Route exact path={ROUTE_ROOT} component={(props) => isOnline ? <Redirect to={ROUTE_DASHBOARD}/> : <Login {...props} />}/>

      {/* Public Routes */}
      <PrivillegedRoute path={ROUTE_LOGIN} requiredState={OFFLINE} Component={Login}/>
      <PrivillegedRoute path={ROUTE_REGISTER} requiredState={OFFLINE} Component={Register}/>
      <PrivillegedRoute path={ROUTE_VERIFICATION} requiredState={OFFLINE} Component={Verification}/>
      <PrivillegedRoute path={ROUTE_RECOVERY} requiredState={OFFLINE} Component={Recovery}/>

      {/* User Routes */}
      <PrivillegedRoute exact path={ROUTE_DASHBOARD} requiredState={ONLINE} Component={Dashboard}/>
      <PrivillegedRoute path={ROUTE_PROFILE} requiredState={ONLINE} Component={Profile}/>

      {/* Admin Routes */}
      <PrivillegedRoute path={ROUTE_ADMIN_USER_USERS} requiredState={ONLINE} requiredRole={ROLE_USER_MANAGER} Component={Users}/>
      <PrivillegedRoute path={ROUTE_ADMIN_USER_REGISTRATIONS} requiredState={ONLINE} requiredRole={ROLE_USER_MANAGER} Component={Registrations}/>
      <PrivillegedRoute path={ROUTE_ADMIN_TEMPLATE_TEMPLATES} requiredState={ONLINE} requiredRole={ROLE_TEMPLATE_MANAGER} Component={Templates}/>
      
      <PrivillegedRoute path={ROUTE_ADMIN_SECTOR_SECTORS} requiredState={ONLINE} requiredRole={ROLE_SECTOR_MANAGER} Component={Sectors}/>
      
      <PrivillegedRoute path={ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS} requiredState={ONLINE} requiredRole={ROLE_ORGANIZATION_MANAGER} Component={Organizations}/>
      <PrivillegedRoute path={ROUTE_ADMIN_PACKAGE_PACKAGES} requiredState={ONLINE} requiredRole={ROLE_PACKAGE_MANAGER} Component={Package}/>

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
    authAxios.post(REST_AUTH_RECONNECT)
      .then(({ data: { data } }) => loadUserState(dispatch, data))
      .catch((error) => console.error(error));
  },
  handleLogout: () => resetUserState(dispatch)
});

// ?Axios interceptor might not be overriden...
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
    // TODO : Check if there is a conflict with this middleware and the original caller handler. For example, when unauthorized, will there be any async issues when original caller set state on error. Could possibly add a value to error to notify original caller
    const adminErrorMiddleware = (error) => {
      const { response: { status } } = error;

      // TODO : Add values to error to notify the original caller that the component will unmount and async calls should be prevented only when certain conditions occur (unauthorized, invalid token, etc...)
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
      setMiddleware(adminSectorRoleAxios, adminErrorMiddleware);
    }
  }, [ isOnline ]);

  // Send a request to server with user's saved token, essentially login without replacing token
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