import { Schema, model } from 'mongoose';
import IReportPeriodDocument from './interface';

// @ts-ignore
// @ts-ignore
export default model<IReportPeriodDocument>(
  'ReportPeriod',
  new Schema({
    value: { type: String }
  }, { minimize: false })
);
