import { Schema, model } from 'mongoose'
import IReportingPeriodDocument from './interface'

const ReportingPeriodModel = model<IReportingPeriodDocument>(
  'ReportingPeriod',
  new Schema(
    {
      value: { type: String }
    },
    { minimize: false }
  )
)

export default ReportingPeriodModel
