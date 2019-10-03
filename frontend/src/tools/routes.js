import React from "react";

import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { ROUTE_LOGIN } from "constants/routes";

const mapStateToPrivillegedRouteProp = (state, ownProps) => ({ 
  isAccessible: state.app.isOnline === ownProps.isOnline,
  path: ownProps.path,
  Component: ownProps.component
});

// Redirect any auth route to login when not logged in
export let PrivillegedRoute = ({ path, Component, isAccessible }) => <Route path={path} render={(props) => isAccessible ? <Component {...props}/> : <Redirect to={ROUTE_LOGIN}/>}/>;

PrivillegedRoute = connect(mapStateToPrivillegedRouteProp, null)(PrivillegedRoute);
