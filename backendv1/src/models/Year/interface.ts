import { Document } from 'mongoose'

export interface IYear {
  value: string
}

export default interface IYearDocument extends IYear, Document {}
