import { IId } from '../../models/interface'
import ICOAEntity from './interface'

export default class COAEntity {
  public _id?: IId


  constructor(
    { 
      _id,

    }: ICOAEntity) {
      this._id = _id

  }
}
