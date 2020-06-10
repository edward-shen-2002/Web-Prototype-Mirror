import { IId } from '../../models/interface'
import ISubmissionPeriodEntity from './interface'

export default class SubmissionPeriodEntity {
  public _id?: IId
  public reportingPeriodId?: IId
  public programId?: IId
  public name?: string
  public startDate?: Date
  public endDate?: Date

  constructor(
    { 
      _id,
      reportingPeriodId,
      programId,
      name,
      startDate,
      endDate
    }: ISubmissionPeriodEntity) {
      this._id = _id
      this.reportingPeriodId = reportingPeriodId
      this.programId = programId
      this.name = name
      this.startDate = startDate
      this.endDate = endDate
  }
}
