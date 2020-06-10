import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const SheetNameModel = model(
  'SheetName',
  new Schema(
    {
      // templateId: { type: ObjectId, ref: "Template" },
      name: { type: String },
      isActive: { type: Boolean }
    }, 
    { minimize: false }
  ),
  'SheetName'
)

export default SheetNameModel
