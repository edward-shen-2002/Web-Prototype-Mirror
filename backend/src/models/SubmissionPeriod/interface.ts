import { Document } from 'mongoose'
import { IId } from '../interface';

export interface ISubmissionPeriod {
  note: string
  submissionId: IId
  creationDate: Date
  userCreatorId: IId
}

export default interface ISubmissionPeriodDocument extends ISubmissionPeriod, Document {}
