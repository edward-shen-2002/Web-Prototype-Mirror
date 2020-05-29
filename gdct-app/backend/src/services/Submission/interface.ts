import Submission from '../../entities/Submission'
import { IId } from '../../models/interface'

export default interface ISubmissionService {
  createSubmission: (submission: Submission) => void
  deleteSubmission: (id: IId) => void
  updateSubmission: (id: IId, submission: Submission) => void
  findSubmission: (submission: Submission) => Promise<Submission[]>
}
