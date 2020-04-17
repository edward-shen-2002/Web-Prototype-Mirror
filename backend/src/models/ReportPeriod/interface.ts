import { Document } from 'mongoose'

export interface IReportPeriod {
  value: string
}

export default interface IReportPeriodDocument extends IReportPeriod, Document {}
