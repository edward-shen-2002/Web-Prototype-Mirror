import { IId } from '../../models/interface'
import IStatusEntity from './interface'

export default class Status {
  public _id?: IId
  public name?: string
  public description?: string
  public isActive?: boolean

  constructor({ _id, name, description, isActive }: IStatusEntity) {
    this._id = _id
    this.name = name
    this.description = description
    this.isActive = isActive
  }
}
