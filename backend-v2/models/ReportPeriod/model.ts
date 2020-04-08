import { Schema, model } from 'mongoose';
import IReportPeriodDocument from './interface';

export default model<IReportPeriodDocument>(
  'ReportPeriod', 
  new Schema({
    value: { type: String }
  }, { minimize: false })
);