import { Document } from 'mongoose'

export interface IReportingPeriod {
  value: string
}

export default interface IReportPeriodDocument
  extends IReportingPeriod,
    Document {}
