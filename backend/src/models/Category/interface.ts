import { Document } from 'mongoose'

export interface ICategory {
  value: string
}

export default interface ICategoryDocument extends ICategory, Document {}
