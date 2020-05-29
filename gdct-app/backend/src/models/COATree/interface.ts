import { Document } from 'mongoose'
import { IId } from '../interface'

export interface ICOATree {
  parentId?: IId
  COAGroupId?: IId
  COAIds?: Array<IId>
  sheetNameId?: IId
}

export default interface ICOATreeDocument
  extends ICOATree,
    Document {}
