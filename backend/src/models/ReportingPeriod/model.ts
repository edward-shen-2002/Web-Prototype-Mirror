import { Schema, model } from 'mongoose'
import IReportingPeriodDocument from './interface'

const ReportingPeriodModel = model<IReportingPeriodDocument>(
  'ReportingPeriod',
  new Schema(
    {
      name: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      application: { type: String }
    },
    { minimize: false }
  )
)

export default ReportingPeriodModel
