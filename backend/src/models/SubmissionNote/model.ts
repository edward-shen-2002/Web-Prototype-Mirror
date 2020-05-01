import { Schema, model } from 'mongoose'
import ISubmissionNoteDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const SubmissionNoteModel = model<ISubmissionNoteDocument>(
  'SubmissionNote',
  new Schema(
    {
      note: { type: String },
      submissionId: { type: ObjectId, ref: "Submission" },
      creationDate: { type: Date },
      userCreatorId: { type: ObjectId, ref: "User" }
    },
    { minimize: false, autoIndex: true }
  )
)

export default SubmissionNoteModel
