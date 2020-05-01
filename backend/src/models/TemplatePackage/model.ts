import { Schema, model } from 'mongoose'
import ITemplatePackageDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const TemplatePackageModel = model<ITemplatePackageDocument>(
  'TemplatePackage',
  new Schema(
    {
      code: { type: String },
      submissionPeriodId: { type: ObjectId, ref: "SubmissionPeriod" },
      templateId: { type: ObjectId, ref: "SubmissionPeriod" },
      isPublished: { type: Boolean },
      creationDate: { type: Date },
      userCreatorId: { type: ObjectId, ref: "User" }
    },
    { minimize: false, autoIndex: true }
  )
)

export default TemplatePackageModel
