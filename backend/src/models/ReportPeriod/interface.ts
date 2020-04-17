import { Document } from 'mongoose'

interface IReportPeriod {
  value: string
}

export default interface IReportPeriodDocument extends IReportPeriod, Document {}
