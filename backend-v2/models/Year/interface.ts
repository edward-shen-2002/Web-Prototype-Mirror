import { Document } from 'mongoose'

interface IYear {
  value: string
}

interface IYearModel extends IYear, Document {}
