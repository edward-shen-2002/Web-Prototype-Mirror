import { IId } from '../../models/interface'
import ICOAEntity from './interface'

export default class COAEntity {
  public _id?: IId
  public name?: string

  constructor(
    { 
      _id,
      name
    }: ICOAEntity) {
      this._id = _id
      this.name = name
  }
}
