import React, { lazy, useEffect, useMemo, Suspense } from "react";

import { connect } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { loadUserState, resetUserState } from "tools/redux";
import { authAxios, adminUserRoleAxios, adminOrganizationRoleAxios, adminSectorRoleAxios, adminTemplateRoleAxios } from "tools/rest";
import { findAndSaveToken } from "tools/storage";
import { ActivityRoute } from "tools/components/routes";

import { ONLINE, OFFLINE } from "constants/states";

import { REST_AUTH_RECONNECT, HTTP_ERROR_INVALID_TOKEN, HTTP_ERROR_UNAUTHORIZED } from "constants/rest";
import { 
  ROUTE_ROOT, 
  ROUTE_DASHBOARD, 
  ROUTE_LOGIN, 
  ROUTE_PROFILE, 
  ROUTE_REGISTER, 
  ROUTE_VERIFICATION,
  ROUTE_RECOVERY, 

  ROUTE_ADMIN_ROOT,
  ROUTE_ADMIN_USER_USERS, 
  ROUTE_ADMIN_USER_REGISTRATIONS,  
  ROUTE_ADMIN_ORGANIZATION_ORGANIZATIONS, 
  ROUTE_ADMIN_TEMPLATE_TEMPLATE,
  ROUTE_ADMIN_TEMPLATE_TEMPLATES,
  ROUTE_ADMIN_PACKAGE_PACKAGES,
  ROUTE_ADMIN_SECTOR_SECTORS
} from "constants/routes";

import Loading from "tools/components/Loading";

import Navigation from "./Navigation";

import AppHeader from "./Header";

// Public Views
const Login = lazy(() => import("./views/PublicRouter/Login"));
const Register = lazy(() => import("./views/PublicRouter/Register"));
const Verification = lazy(() => import("./views/VerificationRouter/Verification"));
const Recovery = lazy(() => import("./views/PublicRouter/Recovery"));

import AdminRouter from "./views/AdminRouter";

// User Views
const Dashboard = lazy(() => import("./views/UserRouter/Dashboard"));
const Profile = lazy(() => import("./views/UserRouter/Profile"));

// Misc Views
const NotFound = lazy(() => import("tools/components/NotFound"));

import "./App.scss";

// ! TODO : Split routes to composition!!!
const AppPageContent = ({ isOnline }) => (
  <Suspense fallback={<Loading/>}>
    <Switch>
      {/* Default Route */}
      {/* <Route exact path={ROUTE_ROOT} component={(props) => isOnline ? <Redirect to={ROUTE_DASHBOARD}/> : <Login {...props} />}/> */}
      <Route exact path={ROUTE_ROOT} component={({ history }) => isOnline ? <Redirect to={ROUTE_DASHBOARD}/> : history.push(ROUTE_LOGIN) }/>

      {/* Public Routes */}
      <ActivityRoute exact path={ROUTE_LOGIN} requiredState={OFFLINE} Component={Login}/>
      <ActivityRoute exact path={ROUTE_REGISTER} requiredState={OFFLINE} Component={Register}/>
      <ActivityRoute exact path={ROUTE_VERIFICATION} requiredState={OFFLINE} Component={Verification}/>
      <ActivityRoute exact path={ROUTE_RECOVERY} requiredState={OFFLINE} Component={Recovery}/>

      {/* User Routes */}
      <ActivityRoute exact exact path={ROUTE_DASHBOARD} requiredState={ONLINE} Component={Dashboard}/>
      <ActivityRoute exact path={ROUTE_PROFILE} requiredState={ONLINE} Component={Profile}/>

      {/* Admin Routes */}
      <ActivityRoute path={ROUTE_ADMIN_ROOT} requiredState={ONLINE} Component={AdminRouter}/>

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
        history.push(ROUTE_DASHBOARD);
      }

      return Promise.reject(error);
    };

    const setMiddleware = (routeAxios, middleware) => routeAxios.interceptors.response.use(null, middleware);

    if(isOnline) {
      setMiddleware(authAxios, authErrorMiddleware);
      setMiddleware(adminUserRoleAxios, adminErrorMiddleware);
      setMiddleware(adminOrganizationRoleAxios, adminErrorMiddleware);
      setMiddleware(adminSectorRoleAxios, adminErrorMiddleware);
      setMiddleware(adminTemplateRoleAxios, adminErrorMiddleware);
    }
  }, [ isOnline ]);

  // Send a request to server with user's saved token, essentially login without replacing token
  findAndSaveToken();

  useEffect(() => {
    if(shouldReconnect) handleReconnect();
  }, [ shouldReconnect ]);

  return (
    <div className="app">
      {isOnline && <AppHeader history={history}/>}
      <AppPage isOnline={isOnline} location={location} history={history} account={account}/>
    </div>
  );
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;