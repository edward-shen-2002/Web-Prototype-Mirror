import { combineReducers } from "redux";

import domain from "./domain";
import app from "./app";
import ui from "./ui";
import TemplateStore from './TemplateStore'

export const root = combineReducers({
  TemplateStore,
  app,
  domain,
  ui
});

export default root;