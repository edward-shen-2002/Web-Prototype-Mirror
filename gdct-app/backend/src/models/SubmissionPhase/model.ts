import { Schema, model } from 'mongoose'
import ISubmissionPhaseDocument from './interface'

const SubmissionPhaseModel = model<ISubmissionPhaseDocument>(
  'SubmissionPhase',
  new Schema(
    {
      name: { type: String },
      description: { type: String },
      isActive: { type: Boolean },

    },
    { minimize: false, autoIndex: true }
  ),
  'SubmissionPhase'
)

export default SubmissionPhaseModel
