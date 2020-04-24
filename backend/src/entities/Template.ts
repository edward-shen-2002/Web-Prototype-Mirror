import { IId } from '../models/interface'
import { ITemplate } from '../models/Template/interface'

// It's possible that we can extend an object for all entity classes
export default class Template {
  public name: string
  public templateData: object
  public templateTypeId: IId
  public userCreatorId: IId
  public creationDate: Date
  public expirationDate: Date
  public statusId: IId

  constructor({
    name,
    templateData,
    templateTypeId,
    userCreatorId,
    creationDate,
    expirationDate,
    statusId,
  }: ITemplate) {
    this.name = name
    this.templateData = templateData
    this.templateTypeId = templateTypeId
    this.userCreatorId = userCreatorId
    this.creationDate = creationDate
    this.expirationDate = expirationDate
    this.statusId = statusId
  }
}
