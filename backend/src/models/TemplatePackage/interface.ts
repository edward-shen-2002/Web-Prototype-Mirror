import { Document } from 'mongoose'
import { IId } from '../interface';

export interface ITemplatePackage {
  name?: string
  submissionPeriodId?: IId
  templateId?: IId
  statusId?: IId
  creationDate?: Date
  userCreatorId?: IId

}

export default interface ITemplatePackageDocument extends ITemplatePackage, Document {}