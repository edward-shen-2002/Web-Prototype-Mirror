import { ISubmission } from '../../models/Submission/interface'
import { IId } from '../../models/interface'

export default interface ISubmissionEntity extends ISubmission {
  _id?: IId
}
