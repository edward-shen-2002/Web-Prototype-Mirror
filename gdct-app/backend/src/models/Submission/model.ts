import { Schema, model } from 'mongoose'
import ISubmissionDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const SubmissionModel = model<ISubmissionDocument>(
  'Submission',
  new Schema(
    {
      name: { type: String },

      organizationId: { type: ObjectId, ref: 'Organization' },
      templateId: { type: ObjectId, ref: 'Template' },
      programId: { type: ObjectId, ref: 'Program' },

      workbookData: { type: Object },
      // phase: { type: String, default: 'edit' },
      statusId: { type: ObjectId, ref: 'Status' },

      isPublished: { type: Boolean, default: false }
    },
    { minimize: false, timestamps: true }
  ),
  'Submission'
)

export default SubmissionModel
