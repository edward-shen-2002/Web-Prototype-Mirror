import { combineReducers } from "redux";

import isAppNavigationOpen from "./isAppNavigationOpen";

const uiReducer = combineReducers({ isAppNavigationOpen });

export default uiReducer;