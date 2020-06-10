import { IId } from '../../models/interface'
import IAppRoleEntity from './interface'

export default class AppRoleEntity {
  public _id?: IId
  public code?: string
  public name?: string

  constructor(
    {
      _id,
      code,
      name
    }: IAppRoleEntity) {
    this._id = _id
    this.code = code
    this.name = name
  }
}
