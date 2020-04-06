import { Schema, model } from "mongoose";

let templateSchema = new Schema({
  name: { type: String, required: true },

  year: { type: Number, required: true },

  reportPeriod: { type: String, required: true },

  submissionCategoryID: { type: ObjectId, ref: "SubmissionCategory" },
  workbookData: {},

  isPublished: { type: Boolean, default: false }
}, { minimize: false });

export default model("Template", templateSchema);
