import { IId } from "../models/interface"

export default class ColumnName {
  public _id?: IId
  public name?: string
  public ID?: string

  constructor(
    {
      _id,
      ID,
      name
    }
  ) {
    this._id = _id
    this.ID = ID
    this.name = name
  }
}
