import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const SubmissionModel = model(
  'Submission',
  new Schema(
    {
      name: { type: String },

      organizationId: { type: ObjectId, ref: 'Organization' },
      templateId: { type: ObjectId, ref: 'Template' },
      programId: { type: ObjectId, ref: 'Program' },

      submittedDate: { type: Date, default: Date.now },

      workbookData: { type: Object },
      // phase: { type: String, default: 'edit' },
      statusId: { type: ObjectId, ref: 'Status' },

      isPublished: { type: Boolean, default: false },
    },
    { minimize: false, timestamps: true },
  ),
  'Submission',
);

export default SubmissionModel;
