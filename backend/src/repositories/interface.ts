import IUserRepository from './User/interface'

import IOrganizationRepository from './Organization/interface'
import IOrganizationGroupRepository from './OrganizationGroup/interface'

import IProgramRepository from './Program/interface'
import ISubmissionRepository from './Submission/interface'
import ITemplateRepository from './Template/interface'

import IChartOfAccountsHierarchyRepository from './ChartOfAccountsHierarchy/interface'
import ICategoryGroupRepository from './ChartOfAccountsGroup/interface'
import IReportingPeriodRepository from './ReportingPeriod/interface'
import IYearRepository from './Year/interface'

import IMasterValueRepository from './MasterValue/interface'

import User from '../entities/User'
import Organization from '../entities/Organization'
import OrganizationGroup from '../entities/OrganizationGroup'
import Program from '../entities/Program'
import Submission from '../entities/Submission'
import Template from '../entities/Template'
import CategoryGroup from '../entities/ChartOfAccountsHierarchy'
import ChartOfAccounts from '../entities/ChartOfAccouns'
import ReportingPeriod from '../entities/ReportingPeriod'
import Year from '../entities/Year'
import MasterValue from '../entities/MasterValue'
import { IId } from '../models/interface'

// https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e
interface IWrite<T> {
  create(item: T): Promise<T>
  update(id: IId, item: T): Promise<T>
  delete(id: IId): Promise<T>
}

interface IRead<T> {
  find(item: T): Promise<T[]>
  findOne(id: IId): Promise<T>
}

interface IValidation<T> {
  validate(id: IId): Promise<void>
}

export interface IRepository<T> extends IWrite<T>, IRead<T>, IValidation<T> {}

export default interface IRepositories {
  UserRepository: IUserRepository<User>

  OrganizationRepository: IOrganizationRepository<Organization>
  OrganizationGroupRepository: IOrganizationGroupRepository<OrganizationGroup>

  ProgramRepository: IProgramRepository<Program>
  SubmissionRepository: ISubmissionRepository<Submission>
  TemplateRepository: ITemplateRepository<Template>

  CategoryGroupHierarchyRepository: IChartOfAccountsHierarchyRepository<
    ChartOfAccounts
  >
  CategoryGroupRepository: ICategoryGroupRepository<CategoryGroup>
  ReportPeriodRepository: IReportingPeriodRepository<ReportingPeriod>
  YearRepository: IYearRepository<Year>

  MasterValueRepository: IMasterValueRepository<MasterValue>
}
