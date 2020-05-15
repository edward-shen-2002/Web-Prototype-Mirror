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
import COAsStore from './COAsStore'
import SheetNamesStore from './SheetNamesStore'
import AppSysesStore from './AppSysesStore'
import DialogsStore from './DialogsStore'

export const root = combineReducers({
  StatusesStore,

  TemplatesStore,
  TemplateTypesStore,
  TemplatePackagesStore,

  COATreeStore,
  COATreesStore,
  COAGroupsStore,
  COAsStore,

  SheetNamesStore,
  AppSysesStore,
  DialogsStore,

  app,
  domain,
  ui
});

export default root;  