import { combineReducers } from "redux";

import domain from "./domain";
import app from "./app";
import ui from "./ui";
import TemplateStore from './TemplateStore'
import TemplateTypeStore from './TemplateTypeStore'
import StatusStore from './StatusStore'

export const root = combineReducers({
  TemplateStore,
  TemplateTypeStore,
  StatusStore,
  app,
  domain,
  ui
});

export default root;