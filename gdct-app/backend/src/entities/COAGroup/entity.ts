import { IId } from '../../models/interface'
import ICOAGroupEntity from './interface'

export default class COAGroupEntity {
  public _id?: IId
  public name?: string
  public code?: string
  public isActive?: boolean

  constructor(
    { 
      _id,
      name,
      code,
      isActive
    }: ICOAGroupEntity) {
      this._id = _id
      this.name = name
      this.code = code
      this.isActive = isActive
  }
}
