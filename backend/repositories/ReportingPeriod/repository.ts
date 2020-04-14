import IReportingPeriodRepository from "./interface";
import IMongoRepository from '../mongo';
import ReportingPeriod from "../../entities/ReportingPeriod";

export default class ReportPeriodRepository implements IMongoRepository<IReportingPeriodRepository<ReportingPeriod>> {
  create(item: IReportingPeriodRepository<ReportingPeriod>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: IReportingPeriodRepository<ReportingPeriod>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: IReportingPeriodRepository<ReportingPeriod>): Promise<IReportingPeriodRepository<ReportingPeriod>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<IReportingPeriodRepository<ReportingPeriod>> {
    throw new Error("Method not implemented.");
  }
  
}