import IReportingPeriodService from './interface'
import ReportingPeriod from '../../entities/ReportingPeriod'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import ReportingPeriodRepository from '../../repositories/ReportingPeriod'

@Service()
export default class ReportingPeriodService implements IReportingPeriodService {
  private reportingPeriodRepository: ReportingPeriodRepository

  constructor() {
    this.reportingPeriodRepository = Container.get(ReportingPeriodRepository)
  }

  public async createReportingPeriod(reportingPeriod: ReportingPeriod) {
    return this.reportingPeriodRepository.create(reportingPeriod).catch((error) => {
      throw error
    })
  }

  public async deleteReportingPeriod(id: IId) {
    return this.reportingPeriodRepository.delete(id)
  }

  public async updateReportingPeriod(id: IId, reportingPeriod: ReportingPeriod) {
    return this.reportingPeriodRepository.update(id, reportingPeriod)
  }

  public async findReportingPeriod(reportingPeriod: ReportingPeriod) {
    return this.reportingPeriodRepository.find(reportingPeriod)
  }
}
