import { IId } from '../../models/interface'
import ISubmissionPeriodEntity from './interface'

export default class SubmissionPeriod {
  public reportingPeriodId?: IId
  public programId?: IId
  public name?: string
  public startDate?: Date
  public endDate?: Date

  constructor(
    { 
      reportingPeriodId,
      programId,
      name,
      startDate,
      endDate
    }: ISubmissionPeriodEntity) {
      this.reportingPeriodId = reportingPeriodId
      this.programId = programId
      this.name = name
      this.startDate = startDate
      this.endDate = endDate
  }
}
