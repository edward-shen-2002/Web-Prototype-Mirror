import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const SubmissionNoteModel = model(
  'SubmissionNote',
  new Schema(
    {
      note: { type: String },
      submissionId: { type: ObjectId, ref: "Submission" },
      creationDate: { type: Date },
      userCreatorId: { type: ObjectId, ref: "User" }
    },
    { minimize: false, autoIndex: true }
  ),
  'SubmissionNote'
)

export default SubmissionNoteModel
