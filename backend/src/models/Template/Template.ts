import { Schema, model, Document } from 'mongoose'
import ITemplateDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const TemplateModel = model<ITemplateDocument>(
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
  )
)

export default TemplateModel
