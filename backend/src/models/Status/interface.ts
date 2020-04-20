import { Document } from 'mongoose'

export interface IStatus {
  value: string
}

export default interface IStatusDocument extends IStatus, Document {}