import { combineReducers } from "redux";

import domain from "./domain";
import app from "./app";
import ui from "./ui";
import TemplateStore from './TemplateStore'
import TemplateTypeStore from './TemplateTypeStore'

export const root = combineReducers({
  TemplateStore,
  TemplateTypeStore,
  app,
  domain,
  ui
});

export default root;