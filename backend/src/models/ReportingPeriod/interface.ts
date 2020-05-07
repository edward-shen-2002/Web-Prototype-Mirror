import { Document } from 'mongoose'

export interface IReportingPeriod {
  name?: string
  startDate?: Date
  endDate?: Date
  application?: string
}

export default interface IReportPeriodDocument
  extends IReportingPeriod,
    Document {}
