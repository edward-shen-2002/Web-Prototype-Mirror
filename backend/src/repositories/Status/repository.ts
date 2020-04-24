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

  public async create(status: Status): Promise<void> {
    return StatusModel.create(status).then(() => {})
  }

  public async update(id: IId, status: Status): Promise<void> {
    return StatusModel.findByIdAndUpdate(id, status).then(() => {})
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
