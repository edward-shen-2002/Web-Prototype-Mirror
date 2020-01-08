import React, { lazy, useState, useMemo, Suspense } from "react";

import { connect } from "react-redux";

import { Switch, Route, Redirect } from "react-router-dom";

import { loadUserState, resetUserState } from "tools/redux";
import { 
  authAxios, 
  adminUserRoleAxios, 
  adminOrganizationRoleAxios, 
  adminSectorRoleAxios, 
  adminTemplateRoleAxios, 
  adminBundleRoleAxios,
  adminEditBundleRoleAxios,
  adminReviewBundleRoleAxios,
  adminApproveBundleRoleAxios
} from "tools/rest";
import { findAndSaveToken } from "tools/storage";
import { ActivityRoute } from "tools/components/routes";

import { ONLINE, OFFLINE } from "constants/states";

import { REST_AUTH_RECONNECT, HTTP_ERROR_INVALID_TOKEN, HTTP_ERROR_UNAUTHORIZED } from "constants/rest";
import { ROUTE_ROOT, ROUTE_USER_PROFILE, ROUTE_VERIFICATION, ROUTE_USER, ROUTE_PUBLIC, ROUTE_ADMIN_ROOT } from "constants/routes";

import Loading from "tools/components/Loading";

import Navigation from "./Navigation";

import AppHeader from "./Header";

import { enableReconnection, disableReconnection } from "actions/app/shouldReconnect";

import VerificationRouter from "./views/VerificationRouter";
import PublicRouter from "./views/PublicRouter";
import UserRouter from "./views/UserRouter";
import AdminRouter from "./views/AdminRouter";

const Login = lazy(() => import("./views/PublicRouter/Login"));

import NotFound from "tools/components/NotFound";

import "./App.scss";
import { useEffect } from "react";

const AppPageContent = ({ isOnline }) => (
  <Suspense fallback={<Loading/>}>
    <Switch>
      <Route exact path={ROUTE_ROOT} component={(props) => isOnline ? <Redirect to={ROUTE_USER_PROFILE}/> : <Login {...props}/> }/>

      <ActivityRoute path={ROUTE_PUBLIC} requiredState={OFFLINE} Component={PublicRouter}/>
      <ActivityRoute path={ROUTE_VERIFICATION} requiredState={OFFLINE} Component={VerificationRouter}/>
      <ActivityRoute path={ROUTE_USER} requiredState={ONLINE} Component={UserRouter}/>
      <ActivityRoute path={ROUTE_ADMIN_ROOT} requiredState={ONLINE} Component={AdminRouter}/>

      <Route component={NotFound}/>
    </Switch>
  </Suspense>
);

const AppPage = ({ isOnline, isAppNavigationOpen, account: { roles }, location, history }) => (
  <div className={`app__page ${isOnline ? "app__page--online" : "app_page--offline" }`}>
    {isAppNavigationOpen && <Navigation location={location} history={history} roles={roles}/>}
    <AppPageContent isOnline={isOnline}/>
  </div>
); 

const mapStateToProps = ({ app: { shouldReconnect, isOnline }, domain: { account }, ui: { isAppNavigationOpen } }) => ({ shouldReconnect, isOnline, isAppNavigationOpen, account });

const mapDispatchToProps = (dispatch) => ({
  handleReconnect: (setIsDataFetched) => {
    dispatch(disableReconnection());
    authAxios.post(REST_AUTH_RECONNECT)
      .then(({ data: { data } }) => {
        loadUserState(dispatch, data);
      })
      .catch((error) => {
        console.error(error);
        resetUserState(dispatch);
      })
      .finally(() => {
        setIsDataFetched(true);
      });
  },
  handleSetReconnectOn: () => dispatch(enableReconnection()),
  handleLogout: () => resetUserState(dispatch)
});

let AppContent = ({
  isOnline, 
  isAppNavigationOpen, 
  account, 
  location, 
  history
}) => (
  <div className="app">
    {isAppNavigationOpen && <AppHeader history={history}/>}
    <AppPage isOnline={isOnline} isAppNavigationOpen={isAppNavigationOpen} location={location} history={history} account={account}/>
  </div>
);

// ?Axios interceptor might not be overriden...
let App = ({ 
  shouldReconnect, 
  isOnline, 
  isAppNavigationOpen, 
  account, 
  location, 
  history,
  handleReconnect, 
  handleLogout, 
  handleSetReconnectOn
}) => {
  const [ isDataFetched, setIsDataFetched ] = useState(false);

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
      console.error("error middleware", error)
      const { response: { status } } = error;

      // TODO : Add values to error to notify the original caller that the component will unmount and async calls should be prevented only when certain conditions occur (unauthorized, invalid token, etc...)
      if(status === HTTP_ERROR_INVALID_TOKEN) {
        handleLogout();
      } else if(status === HTTP_ERROR_UNAUTHORIZED) {
        handleSetReconnectOn();
        history.push(ROUTE_USER_PROFILE);
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
      setMiddleware(adminBundleRoleAxios, adminErrorMiddleware);
      
      setMiddleware(adminEditBundleRoleAxios, adminErrorMiddleware);
      setMiddleware(adminReviewBundleRoleAxios, adminErrorMiddleware);
      setMiddleware(adminApproveBundleRoleAxios, adminErrorMiddleware);
    }
  }, [ isOnline ]);

  // Send a request to server with user's saved token, essentially login without replacing token
  findAndSaveToken();

  useEffect(() => {
    if(shouldReconnect) {
      handleReconnect(setIsDataFetched);
    } else if(!isDataFetched) {
      setIsDataFetched(true);
    }
  });

  return (
    <div className="appContainer">
      {
        isDataFetched
          ? <AppContent
              isOnline={isOnline} 
              isAppNavigationOpen={isAppNavigationOpen} 
              account={account} 
              location={location} 
              history={history}
            /> 
          : <Loading/>
      }
    </div>
  );
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;