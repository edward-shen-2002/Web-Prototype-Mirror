import { Document } from 'mongoose'
import { IId } from '../interface';

export interface ISubmissionNote {
  note: string
  submissionId: IId
  creationDate: Date
  userCreatorId: IId
}

export default interface ISubmissionNoteDocument extends ISubmissionNote, Document {}
