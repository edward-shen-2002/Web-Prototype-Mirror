import { Schema, model } from 'mongoose'
import ITemplatePackageDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const TemplatePackageModel = model<ITemplatePackageDocument>(
  'TemplatePackage',
  new Schema(
    {
      name: { type: String },
      submissionPeriodId: { type: ObjectId, ref: "SubmissionPeriod" },
      statusId: { type: ObjectId, ref: "Status" },
      templateIds: [{ type: ObjectId, ref: "Template" }],
      creationDate: { type: Date, default: Date.now },
      userCreatorId: { type: ObjectId, ref: "User" }
    },
    { minimize: false, autoIndex: true }
  ),
  'TemplatePackage'
)

export default TemplatePackageModel
