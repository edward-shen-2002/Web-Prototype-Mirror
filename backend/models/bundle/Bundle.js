import { Schema, model } from "mongoose";

let bundleSchema = new Schema({
  name: { type: String },
  templates: [],
  sectors: [],
  organizations: [],
  year: { type: Number },
  quarter: { type: String },
}, { minimize: false, timestamps: true });

export default model("Bundle", bundleSchema);
