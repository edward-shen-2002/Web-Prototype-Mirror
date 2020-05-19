import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let categoryGroupHierarchySchema = new Schema({
  submissionCategoryID: { type: ObjectId, ref: "SubmissionCategory" },
  hierarchy: { type: Object, default: {} }
}, { minimize: false });

export default model("CategoryGroupHierarchy", categoryGroupHierarchySchema);
