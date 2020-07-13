import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const TemplatePackageModel = model(
  'TemplatePackage',
  new Schema(
    {
      name: { type: String },
      submissionPeriodId: { type: ObjectId, ref: "SubmissionPeriod" },
      statusId: { type: ObjectId, ref: "Status" },
      templateIds: [{ type: ObjectId, ref: "Template" }],
      creationDate: { type: Date, default: Date.now },
      userCreatorId: { type: ObjectId, ref: "User" },
      programId: [{ type: ObjectId, ref: "program" }],
    },
    { minimize: false, autoIndex: true }
  ),
  'TemplatePackage'
)

export default TemplatePackageModel
