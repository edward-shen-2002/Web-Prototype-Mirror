import ISubmissionPeriodRepository from './interface'
import SubmissionPeriod from '../../entities/SubmissionPeriod'

export default class SubmissionPeriodRepository
  implements ISubmissionPeriodRepository<SubmissionPeriod> {
  validate(id: import("../../models/interface").IId): Promise<void> {
    throw new Error("Method not implemented.")
  }
  create(item: SubmissionPeriod): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  update(
    id: string,
    item: SubmissionPeriod
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  find(
    item: SubmissionPeriod
  ): Promise<SubmissionPeriod[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<SubmissionPeriod> {
    throw new Error('Method not implemented.')
  }
}
