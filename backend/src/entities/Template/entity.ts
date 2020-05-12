import { IId } from '../../models/interface'
import ITemplateEntity from './interface'

// It's possible that we can extend an object for all entity classes
export default class TemplateEntity {
  public _id?: IId
  public name?: string
  public templateData?: object
  public templateTypeId?: IId
  public userCreatorId?: IId
  public creationDate?: Date
  public expirationDate?: Date
  public statusId?: IId

  constructor({
    _id,
    name,
    templateData,
    templateTypeId,
    userCreatorId,
    creationDate,
    expirationDate,
    statusId
  }: ITemplateEntity) {
    this._id = _id
    this.name = name
    this.templateData = templateData
    this.templateTypeId = templateTypeId
    this.userCreatorId = userCreatorId
    this.creationDate = creationDate
    this.expirationDate = expirationDate
    this.statusId = statusId
  }
}
