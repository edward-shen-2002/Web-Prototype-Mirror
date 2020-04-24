import { ITemplateType } from '../models/TemplateType/interface'
import { IId } from '../models/interface'

export default class TemplateType {
  public name: string
  public description: string

  public programIds: Array<IId>

  public isApprovable: boolean
  public isReviewable: boolean
  public isSubmittable: boolean
  public isInputtable: boolean
  public isViewable: boolean
  public isReportable: boolean

  constructor({
    name,
    description,

    programIds,

    isApprovable,
    isReviewable,
    isSubmittable,
    isInputtable,
    isViewable,
    isReportable,
  }: ITemplateType) {
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
