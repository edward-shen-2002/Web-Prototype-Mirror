import { ISubmissionPeriod } from '../../models/SubmissionPeriod/interface'
import { IId } from '../../models/interface'

export default interface ISubmissionPeriodEntity extends ISubmissionPeriod {
  _id?: IId
}
