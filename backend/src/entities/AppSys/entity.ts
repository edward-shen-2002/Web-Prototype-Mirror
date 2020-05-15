import { IId } from '../../models/interface'
import IAppSysEntity from './interface'

export default class AppSysEntity {
  public _id?: IId
  public name?: string
  public code?: string

  constructor(
    {
      _id,
      name,
      code
    }: IAppSysEntity) {
    this._id = _id
    this.name = name
    this.code = code
  }
}
