import { Schema, model } from 'mongoose'
import IChartOfAccountsTree from './interface'

const ObjectId = Schema.Types.ObjectId

const ChartOfAccountsTreeModel = model<IChartOfAccountsTree>(
  'ChartOfAccountsTree',
  new Schema(
    {
      parentId: { type: ObjectId, ref: "ChartOfAccountsTree" },
      chartOfAccountsGroupId: { type: ObjectId, ref: "ChartOfAccountsGroup" },
      chartOfAccountsId: { type: ObjectId, ref: "ChartOfAccounts" },
      sheetNameId: { type: ObjectId, ref: "SheetName" }
    }, 
    { minimize: false }
  )
)

export default ChartOfAccountsTreeModel
