import { Schema, model } from 'mongoose'
import ISubmissionPhaseDocument from './interface'

const SubmissionPhaseModel = model<ISubmissionPhaseDocument>(
  'SubmissionNote',
  new Schema(
    {
      name: { type: String },
      description: { type: String },
      isActive: { type: Boolean },

    },
    { minimize: false, autoIndex: true }
  )
)

export default SubmissionPhaseModel
