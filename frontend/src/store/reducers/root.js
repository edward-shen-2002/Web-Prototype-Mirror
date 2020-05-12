import { combineReducers } from "redux";

import domain from "./domain";
import app from "./app";
import ui from "./ui";
import TemplatesStore from './TemplatesStore'
import TemplateTypesStore from './TemplateTypesStore'
import StatusesStore from './StatusesStore'
import TemplatePackagesStore from './TemplatePackagesStore'
import COATreeStore from './COATreeStore'
import COATreesStore from './COATreesStore'
import COAGroupsStore from './COAGroupsStore'
import COAStore from './COAStore'

export const root = combineReducers({
  TemplatesStore,
  TemplateTypesStore,
  StatusesStore,
  TemplatePackagesStore,
  COATreeStore,
  COATreesStore,
  COAGroupsStore,
  COAStore,
  app,
  domain,
  ui
});

export default root;  