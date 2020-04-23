import IStatusService from './interface'
import Status from "../../entities/Status"
import { IId } from '../../models/interface'
import Container from 'typedi'
import StatusRepository from '../../repositories/Status'

export default class StatusService implements IStatusService {
  private statusRepository: StatusRepository

  constructor() {
    this.statusRepository = Container.get(StatusRepository)
  }

  public async createStatus(status: Status) {
    return this.statusRepository.create(status)
  }
  
  public async deleteStatus(id: IId) {
    return this.statusRepository.delete(id)
  }

  public async updateStatus(id: IId, status: Status) {
    return this.statusRepository.update(id, status)
  }

  public async findStatus(status: Status) {
    return this.statusRepository.find(status)
  }
}