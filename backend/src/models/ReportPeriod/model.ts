import { Schema, model } from 'mongoose';
import IReportingPeriodDocument from './interface'

const ReportingPeriodModel = model<IReportingPeriodDocument>(
  'ReportPeriod', 
  new Schema({
    value: { type: String }
  }, { minimize: false })
)

export default ReportingPeriodModel