import IUserRepository from "./User/interface"

import IOrganizationRepository from "./Organization/interface"
import IOrganizationGroupRepository from "./OrganizationGroup/interface"

import IProgramRepository from "./Program/interface"
import ISubmissionRepository from "./Submission/interface"
import ITemplateRepository from "./Template/interface"

import ICategoryGroupHierarchyRepository from "./CategoryGroupHierarchy/interface"
import ICategoryGroupRepository from "./CategoryGroup/interface"
import IReportPeriodRepository from "./ReportPeriod/interface"
import IYearRepository from "./Year/interface"

import IMasterValueRepository from "./MasterValue/interface"

export default interface IRepositories {
  UserRepository                     : IUserRepository,
  
  OrganizationRepository             : IOrganizationRepository,
  OrganizationGroupRepository        : IOrganizationGroupRepository,
 
  ProgramRepository                  : IProgramRepository,
  SubmissionRepository               : ISubmissionRepository,
  TemplateRepository                 : ITemplateRepository,
 
  CategoryGroupHierarchyRepository   : ICategoryGroupHierarchyRepository,
  CategoryGroupRepository            : ICategoryGroupRepository,
  ReportPeriodRepository             : IReportPeriodRepository,
  YearRepository                     : IYearRepository,

  MasterValueRepository              : IMasterValueRepository
}
