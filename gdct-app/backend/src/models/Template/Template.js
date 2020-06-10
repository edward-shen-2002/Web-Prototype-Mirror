import { Schema, model, Document } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const TemplateModel = model(
  'Template',
  new Schema(
    {
      name: { type: String },

      templateData: { type: Object },

      templateTypeId: { type: ObjectId, ref: 'TemplateType' },

      userCreatorId: { type: ObjectId, ref: 'User' },

      creationDate: { type: Date },

      expirationDate: { type: Date },

      statusId: { type: ObjectId, ref: 'Status' }
    },
    { minimize: false }
  ),
  'Template'
)

export default TemplateModel
