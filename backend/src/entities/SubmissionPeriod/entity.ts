import { IId } from '../../models/interface'
import ISubmissionPeriodEntity from './interface'

export default class Status {
  private note?: String
  private submissionId?: IId
  private creationDate?: Date
  private userCreatorId?: IId

  constructor(
    { 
      note,
      submissionId,
      creationDate,
      userCreatorId
    }: ISubmissionPeriodEntity) {

  }
}
