import IUserRepository from "./User/interface"

import IOrganizationRepository from "./Organization/interface"
import IOrganizationGroupRepository from "./OrganizationGroup/interface"

import IProgramRepository from "./Program/interface"
import ISubmissionRepository from "./Submission/interface"
import ITemplateRepository from "./Template/interface"

import ICategoryGroupHierarchyRepository from "./CategoryGroupHierarchy/interface"
import ICategoryGroupRepository from "./CategoryGroup/interface"
import IReportingPeriodRepository from "./ReportingPeriod/interface"
import IYearRepository from "./Year/interface"

import IMasterValueRepository from "./MasterValue/interface"

// https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
interface IWrite<T> {
  create(item: T): Promise<Boolean>
  update(id: string, item: T): Promise<Boolean>
  delete(id: string): Promise<Boolean>
}

interface IRead<T> {
  find(item: T): Promise<T[]>
  findOne(id: string): Promise<T>
}

export interface IRepository<T> extends IWrite<T>, IRead<T> {
  
}

export default interface IRepositories {
  UserRepository                     : IUserRepository,
  
  OrganizationRepository             : IOrganizationRepository,
  OrganizationGroupRepository        : IOrganizationGroupRepository,
 
  ProgramRepository                  : IProgramRepository,
  SubmissionRepository               : ISubmissionRepository,
  TemplateRepository                 : ITemplateRepository,
 
  CategoryGroupHierarchyRepository   : ICategoryGroupHierarchyRepository,
  CategoryGroupRepository            : ICategoryGroupRepository,
  ReportPeriodRepository             : IReportingPeriodRepository,
  YearRepository                     : IYearRepository,

  MasterValueRepository              : IMasterValueRepository
}
