import { Document } from 'mongoose'

interface IYear {
  value: string
}

export default interface IYearDocument extends IYear, Document {}
