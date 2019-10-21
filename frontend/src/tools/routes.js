import React from "react";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";

import { ROUTE_DASHBOARD, ROUTE_LOGIN } from "constants/routes";

import { ONLINE, OFFLINE } from "constants/states";

const mapStateToProps = ({ app: { isOnline, shouldReconnect }, domain: { account } }) => ({ isOnline, shouldReconnect, account });

export let PrivillegedRoute = ({ isOnline, account, requiredRole, requiredState, path, Component }) => (
  <Route 
    path={path} 
    render={(props) => {
      // Make username the parameter to determine if user is fetched for now...
      if((isOnline && requiredState === OFFLINE) || (requiredRole && account.username && !account.roles.includes(requiredRole)) ){
        return <Redirect to={ROUTE_DASHBOARD}/>
      } else if((!isOnline && requiredState === ONLINE)) {
        return <Redirect to={ROUTE_LOGIN}/>
      } 

      return <Component {...props}/>;
    }}
  />
);

PrivillegedRoute = connect(mapStateToProps)(PrivillegedRoute);