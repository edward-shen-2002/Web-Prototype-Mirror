import { combineReducers } from 'redux'

import domain from './reducerss/domain'
import app from './reducerss/app'
import ui from './reducerss/ui'
import TemplatesStore from './reducerss/TemplatesStore'
import TemplateTypesStore from './reducerss/TemplateTypesStore'
import StatusesStore from './reducerss/StatusesStore'
import TemplatePackagesStore from './reducerss/TemplatePackagesStore'
import COATreeStore from './reducerss/COATreeStore'
import COAGroupsStore from './reducerss/COAGroupsStore'
import COAsStore from './reducerss/COAsStore'
import AppSysesStore from './reducerss/AppSysesStore'
import DialogsStore from './reducerss/DialogsStore'
import SubmissionPeriodsStore from './reducerss/SubmissionPeriodsStore'
import ReportingPeriodsStore from './reducerss/ReportingPeriodsStore'
import SubmissionsStore from './reducerss/SubmissionsStore'

import COATreesStore from './COATreesStore'
import SheetNamesStore from './SheetNamesStore'

export const root = combineReducers({
  StatusesStore,

  TemplatesStore,
  TemplateTypesStore,
  TemplatePackagesStore,

  COATreeStore,
  COATreesStore,
  COAGroupsStore,
  COAsStore,

  SheetNamesStore: SheetNamesStore.reducer,
  AppSysesStore,
  DialogsStore,

  SubmissionPeriodsStore,
  SubmissionsStore,

  ReportingPeriodsStore,

  app,
  domain,
  ui,
})

export default root
