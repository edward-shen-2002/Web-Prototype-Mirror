import { Document } from 'mongoose'
import { IId } from '../interface'
import { ICompressedExcelState } from '../../@types/excel/state'

export interface ISubmission {
  name: string
  organizationId: IId
  templateId: IId
  programId: IId
  workbookData: ICompressedExcelState
  phase: string
  status: string
  isPublished: boolean
}

export default interface ISubmissionDocument extends ISubmission, Document {}
