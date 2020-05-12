import IUserRepository from './User/interface'

import IOrganizationRepository from './Organization/interface'
import IOrganizationGroupRepository from './OrganizationGroup/interface'

import IProgramRepository from './Program/interface'
import ISubmissionRepository from './Submission/interface'
import ITemplateRepository from './Template/interface'

import IReportingPeriodRepository from './ReportingPeriod/interface'

import IMasterValueRepository from './MasterValue/interface'

import UserEntity from '../entities/User'
import OrganizationEntity from '../entities/Organization'
import OrganizationGroupEntity from '../entities/OrganizationGroup'
import ProgramEntity from '../entities/Program'
import SubmissionEntity from '../entities/Submission'
import Template from '../entities/Template'
import ReportingPeriod from '../entities/ReportingPeriod'
import Year from '../entities/Year'
import MasterValueEntity from '../entities/MasterValue'
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
  UserRepository: IUserRepository<UserEntity>

  OrganizationRepository: IOrganizationRepository<OrganizationEntity>
  OrganizationGroupRepository: IOrganizationGroupRepository<OrganizationGroupEntity>

  ProgramRepository: IProgramRepository<ProgramEntity>
  SubmissionRepository: ISubmissionRepository<SubmissionEntity>
  TemplateRepository: ITemplateRepository<Template>
  ReportPeriodRepository: IReportingPeriodRepository<ReportingPeriod>

  MasterValueRepository: IMasterValueRepository<MasterValueEntity>
}
