import { combineReducers } from 'redux'

import domain from './reducerss/domain'
import app from './reducerss/app'
import ui from './reducerss/ui'

import TemplatesStore from './TemplatesStore/store'
import TemplateTypesStore from './TemplateTypesStore/store'
import TemplatePackagesStore from './TemplatePackagesStore/store'
import COAGroupsStore from './COAGroupsStore/store'
import COAsStore from './COAsStore/store'
import AppRolesStore from './AppRolesStore/store'
import AppSysesStore from './AppSysesStore/store'
import AppSysRolesStore from './AppSysRolesStore/store'
import DialogsStore from './DialogsStore/store'
import ReportingPeriodsStore from './ReportingPeriodsStore/store'

import StatusesStore from './StatusesStore/store'
import SubmissionPeriodsStore from './SubmissionPeriodsStore/store'
import ProgramsStore from './ProgramsStore/store'
import SubmissionsStore from './SubmissionsStore/store'
import COATreeStore from './COATreeStore/store'
import COATreesStore from './COATreesStore/store'
import SheetNamesStore from './SheetNamesStore/store'
import ColumnNamesStore from './ColumnNameStore/store'

export const root = combineReducers({
  StatusesStore: StatusesStore.reducer,
  ProgramsStore: ProgramsStore.reducer,
  TemplatesStore: TemplatesStore.reducer,
  TemplateTypesStore: TemplateTypesStore.reducer,
  TemplatePackagesStore: TemplatePackagesStore.reducer,
  COATreesStore: COATreesStore.reducer,
  COAGroupsStore: COAGroupsStore.reducer,
  COAsStore: COAsStore.reducer,
  AppRolesStore: AppRolesStore.reducer,
  AppSysesStore: AppSysesStore.reducer,
  AppSysRolesStore: AppSysRolesStore.reducer,
  DialogsStore: DialogsStore.reducer,
  ReportingPeriodsStore: ReportingPeriodsStore.reducer,

  COATreeStore: COATreeStore.reducer,
  SheetNamesStore: SheetNamesStore.reducer,
  SubmissionPeriodsStore: SubmissionPeriodsStore.reducer,
  SubmissionsStore: SubmissionsStore.reducer,

  ColumnNamesStore: ColumnNamesStore.reducer,

  app,
  domain,
  ui,
})

export default root
