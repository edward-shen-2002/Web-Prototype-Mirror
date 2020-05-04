import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

// import App from "./App";

import { ROUTE_ROOT } from "@constants/routes";
import TemplateRouter from "./views/AdminRouter/TemplateRouter";

const Root = () => (
  <BrowserRouter>
    {/* <Route path={ROUTE_ROOT} component={App}/> */}
    <Route path={ROUTE_ROOT} component={TemplateRouter}/>
  </BrowserRouter>
);

export default Root;
