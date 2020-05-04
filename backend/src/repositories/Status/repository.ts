import IStatusRepository from './interface'
import Status from '../../entities/Status'
import BaseRepository from '../repository'
import { Service } from 'typedi'
import StatusModel from '../../models/Status'
import { IId } from '../../models/interface'

@Service()
export default class StatusRepository extends BaseRepository<Status>
  implements IStatusRepository<Status> {
  constructor() {
    super(StatusModel)
  }

  public async delete(id: IId): Promise<Status> {
    return StatusModel.findByIdAndDelete(id).then(
      (templateType) => new Status(templateType)
    )
  }

  public async create(status: Status): Promise<Status> {
    return StatusModel.create(status).then((status) => new Status(status))
  }

  public async update(id: IId, status: Status): Promise<Status> {
    return StatusModel.findByIdAndUpdate(id, status).then(
      (status) => new Status(status)
    )
  }

  public async find(query: Status): Promise<Status[]> {
    const realQuery = {}

    for (const key in query) {
      if (query[key]) realQuery[key] = query[key]
    }

    return StatusModel.find(realQuery).then((status) =>
      status.map((status) => new Status(status.toObject()))
    )
  }
}
