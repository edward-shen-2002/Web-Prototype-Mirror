import ISubmissionPeriodRepository from './interface'
import SubmissionPeriod from '../../entities/SubmissionPeriod'
import BaseRepository from '../repository'
import SubmissionPeriodModel from '../../models/SubmissionPeriod'
import { IId } from '../../models/interface'

export default class SubmissionPeriodRepository extends BaseRepository<SubmissionPeriod>
  implements ISubmissionPeriodRepository<SubmissionPeriod> {

    public async delete(id: IId): Promise<SubmissionPeriod> {
      return SubmissionPeriodModel.findByIdAndDelete(id).then(
        (submissionPeriod) => new SubmissionPeriod(submissionPeriod.toObject())
      )
    }
  
    public async create(submissionPeriod: SubmissionPeriod): Promise<SubmissionPeriod> {
      return SubmissionPeriodModel.create(submissionPeriod).then((submissionPeriod) => new SubmissionPeriod(submissionPeriod.toObject()))
    }
  
    public async update(id: IId, submissionPeriod: SubmissionPeriod): Promise<SubmissionPeriod> {
      return SubmissionPeriodModel.findByIdAndUpdate(id, submissionPeriod).then(
        (submissionPeriod) => new SubmissionPeriod(submissionPeriod.toObject())
      )
    }
  
    public async find(query: SubmissionPeriod): Promise<SubmissionPeriod[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return SubmissionPeriodModel.find(realQuery).then((status) =>
        status.map((submissionPeriod) => new SubmissionPeriod(submissionPeriod.toObject()))
      )
    }
}
