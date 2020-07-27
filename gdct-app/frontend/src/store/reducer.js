import { combineReducers } from 'redux';

import domain from './reducers/domain';
import app from './reducers/app';
import ui from './reducers/ui';

import TemplatesStore from './TemplatesStore/store';
import TemplateTypesStore from './TemplateTypesStore/store';
import TemplatePackagesStore from './TemplatePackagesStore/store';
import COAGroupsStore from './COAGroupsStore/store';
import COAsStore from './COAsStore/store';
import AppRolesStore from './AppRolesStore/store';
import AppResourcesStore from './AppResourcesStore/store';
import AppRoleResourcesStore from './AppRoleResourcesStore/store';
import AppSysesStore from './AppSysesStore/store';
import AppSysRolesStore from './AppSysRolesStore/store';
import DialogsStore from './DialogsStore/store';
import ReportingPeriodsStore from './ReportingPeriodsStore/store';

import StatusesStore from './StatusesStore/store';
import SubmissionPeriodsStore from './SubmissionPeriodsStore/store';
import ProgramsStore from './ProgramsStore/store';
import SubmissionsStore from './SubmissionsStore/store';
import COATreeStore from './COATreeStore/store';
import COATreesStore from './COATreesStore/store';
import SheetNamesStore from './SheetNamesStore/store';
import ColumnNamesStore from './ColumnNameStore/store';
import OrgsStore from './OrganizationsStore/store';
import WorkflowStore from './WorkflowStore/store';
import WorkflowsStore from './WorkflowsStore/store';
import UserStore from './UserStore/store';

export const root = combineReducers({
  UserStore: UserStore.reducer,
  StatusesStore: StatusesStore.reducer,
  ProgramsStore: ProgramsStore.reducer,
  TemplatesStore: TemplatesStore.reducer,
  TemplateTypesStore: TemplateTypesStore.reducer,
  TemplatePackagesStore: TemplatePackagesStore.reducer,
  COATreesStore: COATreesStore.reducer,
  COAGroupsStore: COAGroupsStore.reducer,
  COAsStore: COAsStore.reducer,
  AppRolesStore: AppRolesStore.reducer,
  AppResourcesStore: AppResourcesStore.reducer,
  AppRoleResourcesStore: AppRoleResourcesStore.reducer,
  AppSysesStore: AppSysesStore.reducer,
  AppSysRolesStore: AppSysRolesStore.reducer,
  DialogsStore: DialogsStore.reducer,
  ReportingPeriodsStore: ReportingPeriodsStore.reducer,
  OrgsStore: OrgsStore.reducer,

  COATreeStore: COATreeStore.reducer,
  SheetNamesStore: SheetNamesStore.reducer,
  SubmissionPeriodsStore: SubmissionPeriodsStore.reducer,
  SubmissionsStore: SubmissionsStore.reducer,

  ColumnNamesStore: ColumnNamesStore.reducer,

  WorkflowStore: WorkflowStore.reducer,
  WorkflowsStore: WorkflowsStore.reducer,

  app,
  domain,
  ui,
});

export default root;
