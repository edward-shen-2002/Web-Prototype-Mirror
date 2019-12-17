import { combineReducers } from "redux";

import isAppNavigationOpen from "./isAppNavigationOpen";

import excel from "./excel";

import template from "./template";

const uiReducer = combineReducers({ isAppNavigationOpen, excel, template });

export default uiReducer;