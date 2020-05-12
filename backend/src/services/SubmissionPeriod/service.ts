import ISubmissionPeriodService from './interface'
import SubmissionPeriod from '../../entities/SubmissionPeriod'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import SubmissionPeriodRepository from '../../repositories/SubmissionPeriod'

@Service()
export default class SubmissionPeriodService implements ISubmissionPeriodService {
  private submissionPeriodRepository: SubmissionPeriodRepository

  constructor() {
    this.submissionPeriodRepository = Container.get(SubmissionPeriodRepository)
  }

  public async createSubmissionPeriod(submissionPeriod: SubmissionPeriod) {
    return this.submissionPeriodRepository.create(submissionPeriod)
  }

  public async deleteSubmissionPeriod(id: IId) {
    return this.submissionPeriodRepository.delete(id)
  }

  public async updateSubmissionPeriod(id: IId, submissionPeriod: SubmissionPeriod) {
    return this.submissionPeriodRepository.update(id, submissionPeriod)
  }

  public async findSubmissionPeriod(submissionPeriod: SubmissionPeriod) {
    return this.submissionPeriodRepository.find(submissionPeriod)
  }
}
