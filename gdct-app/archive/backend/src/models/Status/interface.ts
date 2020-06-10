import { Document } from 'mongoose'

export interface IStatus {
  name: string
  description: string
  isActive: boolean
}

export default interface IStatusDocument extends IStatus, Document {}
