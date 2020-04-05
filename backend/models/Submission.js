import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let submissionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ApproveAvailable: {type: Boolean},
  ReviewAvailable: {type: Boolean},
  SubmitAvailable: {type: Boolean},
  InputAvailable: {type: Boolean},
  ViewAvailable: {type: Boolean},
  ViewCognosAvailable: {type: Boolean},
  program: [{type: String, required: true}]

}, { minimize: false });

export default model("Submission", submissionSchema);