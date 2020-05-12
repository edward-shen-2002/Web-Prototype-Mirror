import { IId } from '../../models/interface'
import IReportingPeriodEntity from './interface'

export default class ReportingPeriodEntity {
  public _id?: IId
  public name?: string
  public startDate?: Date
  public endDate?: Date
  public application?: string

  constructor(
    { 
      _id,
      name,
      startDate,
      endDate,
      application
    }: IReportingPeriodEntity) {
      this._id = _id
      this.name = name
      this.startDate = startDate
      this.endDate = endDate
      this.application = application
  }
}
