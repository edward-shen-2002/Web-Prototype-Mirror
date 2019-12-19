import { Schema, model } from "mongoose";

let organizationBundleSchema = new Schema({
  name: { type: String },
  workbooks: [],
  sector: { type: String },
  organization: { type: String },
  year: { type: Number },
  quarter: { type: String },
  phase: { type: String },
  status: { type: String }
}, { minimize: false, timestamps: true });

export default model("OrganizationBundle", organizationBundleSchema);
