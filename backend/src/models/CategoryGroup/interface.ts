import { Document } from 'mongoose'

export interface ICategoryGroup {
  value: string
}

export default interface ICategoryGroupDocument extends ICategoryGroup, Document {}
