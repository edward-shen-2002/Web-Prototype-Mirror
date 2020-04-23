import { Document } from 'mongoose'
import { IId } from '../interface';

export interface ITemplateType {
  name            : string
  description     : string

  programIds      : Array<IId>
  
  isApprovable    : boolean
  isReviewable    : boolean
  isSubmittable   : boolean
  isInputtable    : boolean
  isViewable      : boolean
  isReportable    : boolean
}

export default interface ITemplateTypeDocument extends ITemplateType, Document {}