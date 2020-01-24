import { Schema, model } from "mongoose";

let organizationBundleSchema = new Schema({
  bundleId: { type: Schema.Types.ObjectId, ref: "Bundle" },
  name: { type: String },
  type: { type: String },
  workbooksData: {},
  organization: {},
  year: { type: Number },
  quarter: { type: String },
  phase: { type: String, default: "edit" },
  status: { type: String, default: "TBD" },
  editorNotes: { type: String, default: "" },
  reviewerNotes: { type: String, default: "" },
  approverNotes: { type: String, default: "" }
}, { minimize: false, timestamps: true });

export default model("OrganizationBundle", organizationBundleSchema);
