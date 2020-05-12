import { IId } from '../../models/interface'
import ICOATreeEntity from './interface'

export default class COATreeEntity {
  public _id?: IId
  public parentId?: IId
  public COAGroupId?: IId 
  public COAId?: IId
  public sheetNameId?: IId

  constructor(
    { 
      _id,
      parentId,
      COAGroupId,
      COAId,
      sheetNameId
    }: ICOATreeEntity) {
      this._id = _id
      this.parentId = parentId
      this.COAGroupId = COAGroupId
      this.COAId = COAId
      this.sheetNameId = sheetNameId
  }
}
