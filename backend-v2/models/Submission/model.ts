import { Schema, model } from "mongoose";
import ISubmissionMode from "./interface";

const ObjectId = Schema.Types.ObjectId;

export default model<ISubmissionMode>(
  "Submission", 
  new Schema(
    {
      name: { type: String },

      organizationID: { type: ObjectId, ref: "Organization" },
      templateID: { type: ObjectId, ref: "Template" },
      programID: { type: ObjectId, ref: "Program" },

      workbookData: { type: Object },
      phase: { type: String, default: "edit" },
      status: { type: String, default: "TBD" },

      isPublished: { type: Boolean, default: false }
    }, 
    { minimize: false, timestamps: true }
  )
);
