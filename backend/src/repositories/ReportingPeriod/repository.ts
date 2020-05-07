import IReportingPeriodRepository from './interface'
import ReportingPeriod from '../../entities/ReportingPeriod'
import BaseRepository from '../repository'
import ReportingPeriodModel from '../../models/ReportingPeriod'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<ReportingPeriod>
  implements IReportingPeriodRepository<ReportingPeriod> {
    public async delete(id: IId): Promise<ReportingPeriod> {
      return ReportingPeriodModel.findByIdAndDelete(id).then(
        (reportingPeriod) => new ReportingPeriod(reportingPeriod.toObject())
      )
    }
  
    public async create(reportingPeriod: ReportingPeriod): Promise<ReportingPeriod> {
      return ReportingPeriodModel.create(reportingPeriod).then((reportingPeriod) => new ReportingPeriod(reportingPeriod.toObject()))
    }
  
    public async update(id: IId, reportingPeriod: ReportingPeriod): Promise<ReportingPeriod> {
      return ReportingPeriodModel.findByIdAndUpdate(id, reportingPeriod).then(
        (reportingPeriod) => new ReportingPeriod(reportingPeriod.toObject())
      )
    }
  
    public async find(query: ReportingPeriod): Promise<ReportingPeriod[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return ReportingPeriodModel.find(realQuery).then((status) =>
        status.map((reportingPeriod) => new ReportingPeriod(reportingPeriod.toObject()))
      )
    }
}
