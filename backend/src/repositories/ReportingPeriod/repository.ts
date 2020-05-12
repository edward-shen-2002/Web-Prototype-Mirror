import IReportingPeriodRepository from './interface'
import ReportingPeriodEntity from '../../entities/ReportingPeriod'
import BaseRepository from '../repository'
import ReportingPeriodModel from '../../models/ReportingPeriod'
import { IId } from '../../models/interface'

export default class ReportPeriodRepository extends BaseRepository<ReportingPeriodEntity>
  implements IReportingPeriodRepository<ReportingPeriodEntity> {
    public async delete(id: IId): Promise<ReportingPeriodEntity> {
      return ReportingPeriodModel.findByIdAndDelete(id).then(
        (reportingPeriod) => new ReportingPeriodEntity(reportingPeriod.toObject())
      )
    }
  
    public async create(reportingPeriod: ReportingPeriodEntity): Promise<ReportingPeriodEntity> {
      return ReportingPeriodModel.create(reportingPeriod).then((reportingPeriod) => new ReportingPeriodEntity(reportingPeriod.toObject()))
    }
  
    public async update(id: IId, reportingPeriod: ReportingPeriodEntity): Promise<ReportingPeriodEntity> {
      return ReportingPeriodModel.findByIdAndUpdate(id, reportingPeriod).then(
        (reportingPeriod) => new ReportingPeriodEntity(reportingPeriod.toObject())
      )
    }
  
    public async find(query: ReportingPeriodEntity): Promise<ReportingPeriodEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return ReportingPeriodModel.find(realQuery).then((status) =>
        status.map((reportingPeriod) => new ReportingPeriodEntity(reportingPeriod.toObject()))
      )
    }
}
