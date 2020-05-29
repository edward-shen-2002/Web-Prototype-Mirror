import { IId } from '../../models/interface'
import ISheetNameEntity from './interface'

export default class SheetNameEntity {
  public _id?: IId
  public name?: string
  public isActive?: boolean
  // public templateId?: IId

  constructor(
    { 
      _id,
      name,
      isActive,
      // templateId
    }: ISheetNameEntity) {
      this._id = _id
      this.name = name
      this.isActive = isActive
      // this.templateId = templateId
  }
}
