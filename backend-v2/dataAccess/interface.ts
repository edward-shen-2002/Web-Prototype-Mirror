import IUserAccess from "./User/interface"

import IOrganizationAccess from "./Organization/interface"
import IOrganizationGroupAccess from "./OrganizationGroup/interface"

import IProgramAccess from "./Program/interface"
import ISubmissionAccess from "./Submission/interface"
import ITemplateAccess from "./Template/interface"

import ICategoryGroupHierarchyAccess from "./CategoryGroupHierarchy/interface"
import ICategoryGroupAccess from "./CategoryGroup/interface"
import IReportPeriodAccess from "./ReportPeriod/interface"
import IYearAccess from "./Year/interface"

import IMasterValueAccess from "./MasterValue/interface"

export default interface IDataAccess {
  UserAccess                     : IUserAccess,
  
  OrganizationAccess             : IOrganizationAccess,
  OrganizationGroupAccess        : IOrganizationGroupAccess,
 
  ProgramAccess                  : IProgramAccess,
  SubmissionAccess               : ISubmissionAccess,
  TemplateAccess                 : ITemplateAccess,
 
  CategoryGroupHierarchyAccess   : ICategoryGroupHierarchyAccess,
  CategoryGroupAccess            : ICategoryGroupAccess,
  ReportPeriodAccess             : IReportPeriodAccess,
  YearAccess                     : IYearAccess,

  MasterValueAccess              : IMasterValueAccess
}
