import { Schema, model } from "mongoose";

let reportPeriodSchema = new Schema({
  value: { type: String }
}, { minimize: false });

export default model("ReportPeriod", reportPeriodSchema);