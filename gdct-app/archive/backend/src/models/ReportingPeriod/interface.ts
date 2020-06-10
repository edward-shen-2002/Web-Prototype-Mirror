import { Document } from 'mongoose'

export interface IReportingPeriod {
  name?: string
  startDate?: Date
  endDate?: Date
}

export default interface IReportPeriodDocument
  extends IReportingPeriod,
    Document {}
