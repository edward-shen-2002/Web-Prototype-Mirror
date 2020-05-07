import { IReportingPeriod } from '../../models/ReportingPeriod/interface'
import { IId } from '../../models/interface'

export default interface IReportingPeriodEntity extends IReportingPeriod {
  _id?: IId
}
