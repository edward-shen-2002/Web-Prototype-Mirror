import { Document } from 'mongoose'
import { IId } from '../interface';

export interface ITemplatePackage {
  name: string
  submissionPeriodId: IId
  templateId: IId

  // should this be status?
  isPublished: boolean
  creationDate: Date
  userCreatorId: IId

}

export default interface ITemplatePackageDocument extends ITemplatePackage, Document {}
