import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let submissionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  ApproveAvailable: {type: Boolean},
  ReviewAvailable: {type: Boolean},
  SubmitAvailable: {type: Boolean},
  InputAvailable: {type: Boolean},
  ViewAvailable: {type: Boolean},
  ViewCognosAvailable: {type: Boolean},

}, { minimize: false });

export default model("Submission", submissionSchema);