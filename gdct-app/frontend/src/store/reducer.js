import { combineReducers } from 'redux'

import domain from './reducerss/domain'
import app from './reducerss/app'
import ui from './reducerss/ui'

import TemplatesStore from './TemplatesStore/store'
import TemplateTypesStore from './TemplateTypesStore/store'
import TemplatePackagesStore from './TemplatePackagesStore/store'
import COAGroupsStore from './COAGroupsStore/store'
import COAsStore from './COAsStore/store'
import AppSysesStore from './AppSysesStore/store'
import DialogsStore from './DialogsStore/store'
import ReportingPeriodsStore from './ReportingPeriodsStore/store'

import StatusesStore from './StatusesStore/store'
import SubmissionPeriodsStore from './SubmissionPeriodsStore/store'
import SubmissionsStore from './SubmissionsStore/store'
import COATreeStore from './COATreeStore/store'
import COATreesStore from './COATreesStore/store'
import SheetNamesStore from './SheetNamesStore/store'

export const root = combineReducers({
  StatusesStore: StatusesStore.reducer,

  TemplatesStore: TemplatesStore.reducer,
  TemplateTypesStore: TemplateTypesStore.reducer,
  TemplatePackagesStore: TemplatePackagesStore.reducer,
  COATreesStore: COATreesStore.reducer,
  COAGroupsStore: COAGroupsStore.reducer,
  COAsStore: COAsStore.reducer,
  AppSysesStore: AppSysesStore.reducer,
  DialogsStore: DialogsStore.reducer,
  ReportingPeriodsStore: ReportingPeriodsStore.reducer,
  
  COATreeStore: COATreeStore.reducer,
  SheetNamesStore: SheetNamesStore.reducer,
  SubmissionPeriodsStore: SubmissionPeriodsStore.reducer,
  SubmissionsStore: SubmissionsStore.reducer,


  app,
  domain,
  ui,
})

export default root
