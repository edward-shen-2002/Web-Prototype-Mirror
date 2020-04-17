import { Document } from 'mongoose'

export interface IColumnName {
  value: string
}

export default interface IColumnNameDocument extends IColumnName, Document {}
