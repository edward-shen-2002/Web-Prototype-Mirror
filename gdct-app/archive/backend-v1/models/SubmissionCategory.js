import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let submissionCategorySchema = new Schema({
  name: { type: String, required: true },
  code: { type: String },
  isApprovable: {type: Boolean},
  isReviewable: {type: Boolean},
  isSubmittable: {type: Boolean},
  isInputtable: {type: Boolean},
  isViewable: {type: Boolean},
  isCognosable: {type: Boolean}
}, { minimize: false });

export default model("SubmissionCategory", submissionCategorySchema);
