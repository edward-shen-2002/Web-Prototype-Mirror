import { Document } from 'mongoose'

interface IReportPeriod {
  value: string
}

export default interface IReportPeriodModel extends IReportPeriod, Document {}
