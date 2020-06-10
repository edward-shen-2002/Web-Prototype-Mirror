import SubmissionPeriod from '../../entities/SubmissionPeriod'
import { IId } from '../../models/interface'

export default interface ISubmissionPeriodService {
  createSubmissionPeriod: (submissionPeriod: SubmissionPeriod) => void
  deleteSubmissionPeriod: (id: IId) => void
  updateSubmissionPeriod: (id: IId, submissionPeriod: SubmissionPeriod) => void
  findSubmissionPeriod: (submissionPeriod: SubmissionPeriod) => Promise<SubmissionPeriod[]>
}
