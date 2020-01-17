import React from "react";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

import { ROUTE_USER_PROFILE, ROUTE_PUBLIC_LOGIN } from "@constants/routes";

import { ROLE_LEVEL_NOT_APPLICABLE } from "@constants/roles";

import { ONLINE, OFFLINE } from "@constants/states";

const mapActivityStateToProps = ({ app: { isOnline, shouldReconnect } }) => ({ isOnline, shouldReconnect });

export let ActivityRoute = ({ isOnline, requiredState, exact, path, Component }) => (
  <Route 
    exact={exact}
    path={path} w
    render={(props) => {
      let RouteComponent;

      // Make username the parameter to determine if user is fetched for now...
      if(isOnline && requiredState === OFFLINE){
        RouteComponent = <Redirect to={ROUTE_USER_PROFILE}/>
      } else if((!isOnline && requiredState === ONLINE)) {
        RouteComponent = <Redirect to={ROUTE_PUBLIC_LOGIN}/>
      } else {
        RouteComponent = <Component {...props}/>;
      }

      return RouteComponent;
    }}
  />
);

ActivityRoute = connect(mapActivityStateToProps)(ActivityRoute);

const mapRoleStateToProps = ({ domain: { account } }) => ({ account });

export let AdminRoleRoute = ({ account, requiredRole, exact, path, Component }) => (
  <Route 
    exact={exact}
    path={path}
    render={(props) => {
      let RouteComponent;

      // Make username the parameter to determine if user is fetched for now...
      if(account.username && account.roles[requiredRole].scope === ROLE_LEVEL_NOT_APPLICABLE){
        RouteComponent = <Redirect to={ROUTE_USER_PROFILE}/>
      } else {
        RouteComponent = <Component {...props}/>;
      }

      return RouteComponent;
    }}
  />
);

AdminRoleRoute = connect(mapRoleStateToProps)(AdminRoleRoute);