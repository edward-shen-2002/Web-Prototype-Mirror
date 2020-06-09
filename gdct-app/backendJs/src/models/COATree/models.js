import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const COATreeModel = model(
  'COATree',
  new Schema(
    {
      parentId: { type: ObjectId, ref: "COATree" },
      COAGroupId: { type: ObjectId, ref: "COAGroup" },
      COAIds: [{ type: ObjectId, ref: "COA" }],
      sheetNameId: { type: ObjectId, ref: "SheetName" }
    }, 
    { minimize: false }
  ),
  'COATree'
)

export default COATreeModel
