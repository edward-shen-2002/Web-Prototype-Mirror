import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

// import App from "./App";

import { ROUTE_ROOT } from "@constants/routes";
import Templatesv2 from "./views/AdminRouter/TemplateRouter/Templates/Templatesv2";

const Root = () => (
  <BrowserRouter>
    {/* <Route path={ROUTE_ROOT} component={App}/> */}
    <Route path={ROUTE_ROOT} component={Templatesv2}/>
  </BrowserRouter>
);

export default Root;
