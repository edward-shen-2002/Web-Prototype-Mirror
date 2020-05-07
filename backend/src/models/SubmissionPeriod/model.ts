import { Schema, model } from 'mongoose'
import ISubmissionPeriodDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const SubmissionPeriodModel = model<ISubmissionPeriodDocument>(
  'SubmissionPeriod',
  new Schema(
    {
      reportingPeriodId: { type: ObjectId, ref: "ReportingPeriod" },
      programId: { type: ObjectId, ref: "Program" },
      name: { type: String },
      startDate: { type: Date },
      endDate: { type: Date }
    },
    { minimize: false, autoIndex: true }
  )
)

export default SubmissionPeriodModel
