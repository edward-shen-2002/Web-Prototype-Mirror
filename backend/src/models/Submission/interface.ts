import { Document } from 'mongoose'
import { IId } from '../interface'

export interface ISubmission {
  name: string
  organizationId: IId
  templateId: IId
  programId: IId
  workbookData: object
  phase: string
  status: string
  isPublished: boolean
}

export default interface ISubmissionDocument extends ISubmission, Document {}
