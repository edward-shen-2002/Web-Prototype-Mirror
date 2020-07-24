import Container from 'typedi';
import ReportingPeriodRepository from '../../repositories/ReportingPeriod';

// @Service()
export default class ReportingPeriodService {
  constructor() {
    this.reportingPeriodRepository = Container.get(ReportingPeriodRepository);
  }

  async createReportingPeriod(reportingPeriod) {
    return this.reportingPeriodRepository.create(reportingPeriod);
  }

  async deleteReportingPeriod(id) {
    return this.reportingPeriodRepository.delete(id);
  }

  async updateReportingPeriod(id, reportingPeriod) {
    return this.reportingPeriodRepository.update(id, reportingPeriod);
  }

  async findReportingPeriod(reportingPeriod) {
    return this.reportingPeriodRepository.find(reportingPeriod);
  }
}
