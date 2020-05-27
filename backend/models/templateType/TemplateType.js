import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let templateTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isApprovable: {type: Boolean},
  isReviewable: {type: Boolean},
  isSubmittable: {type: Boolean},
  isInputtable: {type: Boolean},
  isViweable: {type: Boolean},
  isReportable: {type: Boolean},
  programId: [{type: ObjectId, required: true}]

}, { minimize: false });

export default model("TemplateType", templateTypeSchema, "TemplateType");