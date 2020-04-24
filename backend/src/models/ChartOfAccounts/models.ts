import { Schema, model } from 'mongoose'
import IChartOfAccounts from './interface'

const ObjectId = Schema.Types.ObjectId

const ChartOfAccountsModel = model<IChartOfAccounts>(
  'ChartOfAccounts',
  new Schema({}, { minimize: false })
)

export default ChartOfAccountsModel
