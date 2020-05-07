import { combineReducers } from "redux";

import domain from "./domain";
import app from "./app";
import ui from "./ui";
import TemplateStore from './TemplateStore'
import TemplateTypeStore from './TemplateTypeStore'
import StatusStore from './StatusStore'
import TemplatePackageStore from './TemplatePackageStore'

export const root = combineReducers({
  TemplateStore,
  TemplateTypeStore,
  StatusStore,
  TemplatePackageStore,
  app,
  domain,
  ui
});

export default root;