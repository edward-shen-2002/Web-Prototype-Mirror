import { Document } from 'mongoose'
import { IId } from '../interface';

export interface ISubmissionPeriod {
  reportingPeriodId?: IId
  programId?: IId
  name?: string
  startDate?: Date
  endDate?: Date
}

export default interface ISubmissionPeriodDocument extends ISubmissionPeriod, Document {}
