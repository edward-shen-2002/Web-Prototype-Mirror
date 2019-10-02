import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";

import { ROUTE_HOME } from "constants/routes";

// const Root = () => (
//   <BrowserRouter>
//     <Route path={ROUTE_HOME} component={App} />
//   </BrowserRouter>
// );

const Root = () => {
  console.log("Loading root");
  return <App/>
}

export default Root;