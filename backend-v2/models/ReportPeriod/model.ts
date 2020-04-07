import { Schema, model } from "mongoose";
import IReportPeriodModel from "./interface";

export default model<IReportPeriodModel>(
  "ReportPeriod", 
  new Schema({
    value: { type: String }
  }, { minimize: false })
);