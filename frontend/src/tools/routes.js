import React from "react";

import { Route, Redirect } from "react-router-dom";

import { ROUTE_DASHBOARD, ROUTE_LOGIN } from "constants/routes";

import { ONLINE, OFFLINE } from "constants/states";

export const PrivillegedRoute = ({ isOnline, requiredState, path, Component }) => (
  <Route 
    path={path} 
    render={(props) => {
      if(isOnline && requiredState === OFFLINE) {
        return <Redirect to={ROUTE_DASHBOARD}/>
      } else if(!isOnline && requiredState === ONLINE) {
        return <Redirect to={ROUTE_LOGIN}/>
      }

      return <Component {...props}/>;
    }}
  />
);