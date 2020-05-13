import { Model } from 'mongoose'

import IUserDocument from './User/interface'
import IOrganizationDocument from './Organization/interface'
import IOrganizationGroupDocument from './OrganizationGroup/interface'
import IProgramDocument from './Program/interface'
import ISubmissionDocument from './Submission/interface'

import IChartOfAccounts from './COA/interface'
import ICOATreeDocument from './COATree/interface'
import ICOAGroupDocument from './COAGroup/interface'

import IReportPeriodDocument from './ReportingPeriod/interface'
import IMasterValueDocument from './MasterValue/interface'
import ITemplateDocument from './Template/interface'

export type IId = string | number | object

export default interface IModels {
  UserModel: Model<IUserDocument>

  OrganizationModel: Model<IOrganizationDocument>
  OrganizationGroupModel: Model<IOrganizationGroupDocument>

  ProgramModel: Model<IProgramDocument>
  SubmissionModel: Model<ISubmissionDocument>
  TemplateModel: Model<ITemplateDocument>

  ChartOfAccounts: Model<IChartOfAccounts>
  ChartOfAccountsGroupModel: Model<ICOAGroupDocument>
  ChartOfAccountsGroupHierarchyModel: Model<ICOATreeDocument>

  ReportPeriodModel: Model<IReportPeriodDocument>

  MasterValueModel: Model<IMasterValueDocument>
}
