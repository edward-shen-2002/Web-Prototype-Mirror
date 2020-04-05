import { Schema, model } from "mongoose";

let bundleSchema = new Schema({
  name: { type: String },
  templates: [],
  sectors: [],
  organizations: [],
  year: { type: Number },
  quarter: { type: String },
  published: { type: Boolean },
  publishedIds: []
}, { minimize: false, timestamps: true });

export default model("Bundle", bundleSchema);
