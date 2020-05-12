import ISubmissionRepository from './interface'
import SubmissionEntity from '../../entities/Submission'
import BaseRepository from '../repository'

export default class SubmissionRepository extends BaseRepository<SubmissionEntity>
  implements ISubmissionRepository<SubmissionEntity> {
  create(item: ISubmissionRepository<SubmissionEntity>): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  update(
    id: string,
    item: ISubmissionRepository<SubmissionEntity>
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  find(
    item: ISubmissionRepository<SubmissionEntity>
  ): Promise<ISubmissionRepository<SubmissionEntity>[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<ISubmissionRepository<SubmissionEntity>> {
    throw new Error('Method not implemented.')
  }
}
