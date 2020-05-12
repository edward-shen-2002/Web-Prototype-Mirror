import ISubmissionPeriodRepository from './interface'
import SubmissionPeriodEntity from '../../entities/SubmissionPeriod'
import BaseRepository from '../repository'
import SubmissionPeriodModel from '../../models/SubmissionPeriod'
import { IId } from '../../models/interface'

export default class SubmissionPeriodRepository extends BaseRepository<SubmissionPeriodEntity>
  implements ISubmissionPeriodRepository<SubmissionPeriodEntity> {

    public async delete(id: IId): Promise<SubmissionPeriodEntity> {
      return SubmissionPeriodModel.findByIdAndDelete(id).then(
        (submissionPeriod) => new SubmissionPeriodEntity(submissionPeriod.toObject())
      )
    }
  
    public async create(submissionPeriod: SubmissionPeriodEntity): Promise<SubmissionPeriodEntity> {
      return SubmissionPeriodModel.create(submissionPeriod).then((submissionPeriod) => new SubmissionPeriodEntity(submissionPeriod.toObject()))
    }
  
    public async update(id: IId, submissionPeriod: SubmissionPeriodEntity): Promise<SubmissionPeriodEntity> {
      return SubmissionPeriodModel.findByIdAndUpdate(id, submissionPeriod).then(
        (submissionPeriod) => new SubmissionPeriodEntity(submissionPeriod.toObject())
      )
    }
  
    public async find(query: SubmissionPeriodEntity): Promise<SubmissionPeriodEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return SubmissionPeriodModel.find(realQuery).then((status) =>
        status.map((submissionPeriod) => new SubmissionPeriodEntity(submissionPeriod.toObject()))
      )
    }
}
