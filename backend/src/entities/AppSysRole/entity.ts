import { IId } from '../../models/interface'
import IAppSysRoleEntity from './interface'

export default class AppSysRoleEntity {
  public _id?: IId
  public appSys?: string
  public role?: string

  constructor(
    {
      _id,
      appSys,
      role
    }: IAppSysRoleEntity) {
    this._id = _id
    this.appSys = appSys
    this.role = role
  }
}
