import { Document } from 'mongoose'
import { IId } from '../interface'

export interface ICOATree {
  parentId: IId
  COAGroupId: IId
  COAId: IId
  sheetNameId: IId
}

export default interface ICOATreeDocument
  extends ICOATree,
    Document {}
