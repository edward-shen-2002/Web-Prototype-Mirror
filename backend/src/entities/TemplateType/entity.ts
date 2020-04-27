import { IId } from '../../models/interface'

export default class TemplateType {
  public _id?: IId
  public name?: string
  public description?: string

  public programIds?: Array<IId>

  public isApprovable?: boolean
  public isReviewable?: boolean
  public isSubmittable?: boolean
  public isInputtable?: boolean
  public isViewable?: boolean
  public isReportable?: boolean

  constructor({
    _id,
    name,
    description,

    programIds,

    isApprovable,
    isReviewable,
    isSubmittable,
    isInputtable,
    isViewable,
    isReportable
  }) {
    this._id = _id
    this.name = name
    this.description = description
    this.programIds = programIds
    this.isApprovable = isApprovable
    this.isReviewable = isReviewable
    this.isSubmittable = isSubmittable
    this.isInputtable = isInputtable
    this.isViewable = isViewable
    this.isReportable = isReportable
  }
}
