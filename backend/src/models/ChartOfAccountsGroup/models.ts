import { Schema, model } from 'mongoose'
import IChartOfAccountsGroup from './interface'

const ObjectId = Schema.Types.ObjectId

const ChartOfAccountsGroupModel = model<IChartOfAccountsGroup>(
  'ChartOfAccountsGroup',
  new Schema(
    {
      name: { type: String },
      code: { type: String },
      isActive: { type: Boolean }
    }, 
    { minimize: false }
  )
)

export default ChartOfAccountsGroupModel
