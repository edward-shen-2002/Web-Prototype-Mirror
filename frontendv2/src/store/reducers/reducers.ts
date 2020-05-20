import { combineReducers } from "redux";

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

export const root = combineReducers(
  {
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
    DialogsStore
  }
);

export default root;  