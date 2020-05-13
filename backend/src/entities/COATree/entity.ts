import { IId } from '../../models/interface'
import ICOATreeEntity from './interface'

export default class COATreeEntity {
  public _id?: IId
  public parentId?: IId
  public COAGroupId?: IId 
  public COAIds?: Array<IId>
  public sheetNameId?: IId

  constructor(
    { 
      _id,
      parentId,
      COAGroupId,
      COAIds,
      sheetNameId
    }: ICOATreeEntity) {
      this._id = _id
      this.parentId = parentId
      this.COAGroupId = COAGroupId
      this.COAIds = COAIds
      this.sheetNameId = sheetNameId
  }
}
