import { IId } from '../../models/interface'
import ICOAGroupEntity from './interface'

export default class COAGroupEntity {
  public _id?: IId

  constructor(
    { 
      _id,
    }: ICOAGroupEntity) {
      this._id = _id
  }
}
