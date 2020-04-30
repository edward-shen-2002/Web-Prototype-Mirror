import { Document } from 'mongoose'
import { IId } from '../interface'

export interface IChartOfAccountsHierarchy {
  parentId: IId
  chartOfAccountsGroupId: IId
  chartOfAccountsId: IId
  sheetNameId: IId
}

export default interface IChartOfAccountsHierarchyDocument
  extends IChartOfAccountsHierarchy,
    Document {}
