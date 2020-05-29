import ISubmissionRepository from './interface'
import SubmissionEntity from '../../entities/Submission/Submission'
import BaseRepository from '../repository'
import SubmissionModel from '../../models/Submission'
import { IId } from '../../models/interface'

export default class SubmissionRepository extends BaseRepository<SubmissionEntity>
  implements ISubmissionRepository<SubmissionEntity> {
    constructor() {
      super(SubmissionModel)
    }

    public async delete(id: IId): Promise<SubmissionEntity> {
      return SubmissionModel.findByIdAndDelete(id).then(
        (submission) => new SubmissionEntity(submission.toObject())
      )
    }
  
    public async create(submission: SubmissionEntity): Promise<SubmissionEntity> {
      return SubmissionModel.create(submission).then((submission) => new SubmissionEntity(submission.toObject()))
    }
  
    public async update(id: IId, submission: SubmissionEntity): Promise<SubmissionEntity> {
      return SubmissionModel.findByIdAndUpdate(id, submission).then(
        (submission) => new SubmissionEntity(submission.toObject())
      )
    }
  
    public async find(query: SubmissionEntity): Promise<SubmissionEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return SubmissionModel.find(realQuery).then((submissions) =>
        submissions.map((submission) => new SubmissionEntity(submission.toObject()))
      )
    }
}
