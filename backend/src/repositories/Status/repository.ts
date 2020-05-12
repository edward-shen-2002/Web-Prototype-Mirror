import IStatusRepository from './interface'
import StatusEntity from '../../entities/Status'
import BaseRepository from '../repository'
import { Service } from 'typedi'
import StatusModel from '../../models/Status'
import { IId } from '../../models/interface'

@Service()
export default class StatusRepository extends BaseRepository<StatusEntity>
  implements IStatusRepository<StatusEntity> {
  constructor() {
    super(StatusModel)
  }

  public async delete(id: IId): Promise<StatusEntity> {
    return StatusModel.findByIdAndDelete(id).then(
      (status) => new StatusEntity(status)
    )
  }

  public async create(status: StatusEntity): Promise<StatusEntity> {
    return StatusModel.create(status).then((status) => new StatusEntity(status))
  }

  public async update(id: IId, status: StatusEntity): Promise<StatusEntity> {
    return StatusModel.findByIdAndUpdate(id, status).then(
      (status) => new StatusEntity(status)
    )
  }

  public async find(query: StatusEntity): Promise<StatusEntity[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return StatusModel.find(realQuery).then((status) =>
      status.map((status) => new StatusEntity(status.toObject()))
    )
  }
}
