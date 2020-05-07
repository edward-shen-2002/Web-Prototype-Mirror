import { IId } from '../../models/interface'
import ITemplatePackageEntity from './interface'

export default class TemplatePackage {
  public _id?: IId
  public name?: string
  public submissionPeriodId?: IId
  public templateIds?: Array<IId>
  public statusId?: IId
  public creationDate?: Date
  public userCreatorId?: IId

  constructor({
    _id,
    name,
    submissionPeriodId,
    templateIds,
    statusId,
    creationDate,
    userCreatorId
  }: ITemplatePackageEntity) {
    this._id = _id
    this.name = name
    this.submissionPeriodId = submissionPeriodId
    this.templateIds = templateIds
    this.statusId = statusId
    this.creationDate = creationDate
    this.userCreatorId = userCreatorId 
  }
}
