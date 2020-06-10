import { Schema, model } from 'mongoose'
import ISheetName from './interface'

const ObjectId = Schema.Types.ObjectId

const SheetNameModel = model<ISheetName>(
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
