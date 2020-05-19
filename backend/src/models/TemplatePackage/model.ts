import { Schema, model } from 'mongoose'
import ITemplatePackageDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const TemplatePackageModel = model<ITemplatePackageDocument>(
  'TemplatePackage',
  new Schema(
    {
      code: { type: String },
      submissionPeriodId: { type: ObjectId, ref: "SubmissionPeriod" },
      templateIds: [{ type: ObjectId, ref: "Template" }],
      isPublished: { type: Boolean },
      creationDate: { type: Date },
      userCreatorId: { type: ObjectId, ref: "User" }
    },
    { minimize: false, autoIndex: true }
  ),
  'TemplatePackage'
)

export default TemplatePackageModel
