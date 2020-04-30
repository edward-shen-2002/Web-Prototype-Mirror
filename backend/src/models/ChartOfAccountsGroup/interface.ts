import { Document } from 'mongoose'
import { IId } from '../interface'

export interface IChartOfAccountsGroup {
  name: string
  code: string
  isActive: boolean
}

export default interface IChartOfAccountsGroupDocument
  extends IChartOfAccountsGroup,
    Document {}
