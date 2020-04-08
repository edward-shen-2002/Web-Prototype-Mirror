import { Model } from 'mongoose'

import IUserDocument from './User/interface';
import IOrganizationDocument from './Organization/interface';
import IOrganizationGroupDocument from './OrganizationGroup/interface';
import IProgramDocument from './Program/interface';
import ISubmissionDocument from './Submission/interface';
import ICategoryGroupHierarchyDocument from './CategoryGroupHierarchy/interface';
import ICategoryGroupDocument from './CategoryGroup/interface';
import IReportPeriodDocument from './ReportPeriod/interface';
import IYearModel from './Year/interface';
import IMasterValueDocument from './MasterValue/interface';
import ITemplateDocument from './Template/interface'

export default interface IModels {
  UserModel                     : Model<IUserDocument>,

  OrganizationModel             : Model<IOrganizationDocument>,
  OrganizationGroupModel        : Model<IOrganizationGroupDocument>,

  ProgramModel                  : Model<IProgramDocument>,
  SubmissionModel               : Model<ISubmissionDocument>,
  TemplateModel                 : Model<ITemplateDocument>,

  CategoryGroupHierarchyModel   : Model<ICategoryGroupHierarchyDocument>,
  CategoryGroupModel            : Model<ICategoryGroupDocument>,
  ReportPeriodModel             : Model<IReportPeriodDocument>,
  YearModel                     : Model<IYearModel>,

  MasterValueModel              : Model<IMasterValueDocument>
}
