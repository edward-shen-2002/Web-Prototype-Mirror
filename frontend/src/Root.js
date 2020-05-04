import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

// import App from "./App";

import { ROUTE_ROOT } from "@constants/routes";

import AppV2 from './AppV2'

const Root = () => (
  <BrowserRouter>
    {/* <Route path={ROUTE_ROOT} component={App}/> */}
    <Route path={ROUTE_ROOT} component={AppV2}/>
  </BrowserRouter>
);

export default Root;
