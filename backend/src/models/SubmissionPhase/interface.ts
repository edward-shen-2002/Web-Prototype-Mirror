import { Document } from 'mongoose'

export interface ISubmissionPhase {
  name: string
  description: string
  isActive: boolean
}

export default interface ISubmissionPhaseDocument extends ISubmissionPhase, Document {}
