import { combineReducers } from "redux";

import domain from "./domain";
import app from "./app";
// import ui from "./ui";

export const root = combineReducers({
  app,
  domain,
  // ui
});

export default root;