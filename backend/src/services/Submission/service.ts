import ISubmissionService from './interface'
import Submission from '../../entities/Submission'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import SubmissionRepository from '../../repositories/Submission'

@Service()
export default class SubmissionService implements ISubmissionService {
  private submissionRepository: SubmissionRepository

  constructor() {
    this.submissionRepository = Container.get(SubmissionRepository)
  }

  public async createSubmission(submission: Submission) {
    return this.submissionRepository.create(submission)
  }

  public async deleteSubmission(id: IId) {
    return this.submissionRepository.delete(id)
  }

  public async updateSubmission(id: IId, submission: Submission) {
    return this.submissionRepository.update(id, submission)
  }

  public async findSubmission(submission: Submission) {
    return this.submissionRepository.find(submission)
  }
}
