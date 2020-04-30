import { Document } from 'mongoose'
import { IId } from '../interface'

export interface IChartOfAccounts {
  name: string
}

export default interface IChartOfAccountsDocument
  extends IChartOfAccounts,
    Document {}
