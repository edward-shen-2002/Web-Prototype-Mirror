import { Schema, model } from 'mongoose'
import ICOATree from './interface'

const ObjectId = Schema.Types.ObjectId

const COATreeModel = model<ICOATree>(
  'COATree',
  new Schema(
    {
      parentId: { type: ObjectId, ref: "COATree" },
      COAGroupId: { type: ObjectId, ref: "COAGroup" },
      COAIds: [{ type: ObjectId, ref: "COA" }],
      sheetNameId: { type: ObjectId, ref: "SheetName" }
    }, 
    { minimize: false }
  )
)

export default COATreeModel
