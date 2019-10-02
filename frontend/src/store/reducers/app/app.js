import { combineReducers } from "redux";

import isOnline from "./isOnline";

const appReducer = combineReducers({
  isOnline
});

export default appReducer;