import React from "react";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

import { ROUTE_DASHBOARD, ROUTE_LOGIN } from "constants/routes";

import { ROLE_LEVEL_NOT_APPLICABLE } from "constants/roles";

import { ONLINE, OFFLINE } from "constants/states";

const mapStateToProps = ({ app: { isOnline, shouldReconnect }, domain: { account } }) => ({ isOnline, shouldReconnect, account });

export let PrivillegedRoute = ({ isOnline, account, requiredRole, requiredState, exact, path, Component }) => (
  <Route 
    exact={exact}
    path={path} w
    render={(props) => {
      let RouteComponent;

      // Make username the parameter to determine if user is fetched for now...
      if((isOnline && requiredState === OFFLINE) || (requiredRole && account.username && account.roles[requiredRole].scope === ROLE_LEVEL_NOT_APPLICABLE)){
        RouteComponent = <Redirect to={ROUTE_DASHBOARD}/>
      } else if((!isOnline && requiredState === ONLINE)) {
        RouteComponent = <Redirect to={ROUTE_LOGIN}/>
      } else {
        RouteComponent = <Component {...props}/>;
      }

      return RouteComponent;
    }}
  />
);

PrivillegedRoute = connect(mapStateToProps)(PrivillegedRoute);