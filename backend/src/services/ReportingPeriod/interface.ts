import ReportingPeriod from '../../entities/ReportingPeriod'
import { IId } from '../../models/interface'

export default interface IReportingPeriodService {
  createReportingPeriod: (reportingPeriod: ReportingPeriod) => void
  deleteReportingPeriod: (id: IId) => void
  updateReportingPeriod: (id: IId, reportingPeriod: ReportingPeriod) => void
  findReportingPeriod: (reportingPeriod: ReportingPeriod) => Promise<ReportingPeriod[]>
}
