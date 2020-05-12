import ICOAGroupService from './interface'
import COAGroup from '../../entities/COAGroup'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import COAGroupRepository from '../../repositories/COAGroup'

@Service()
export default class COAGroupService implements ICOAGroupService {
  private COAGroupRepository: COAGroupRepository

  constructor() {
    this.COAGroupRepository = Container.get(COAGroupRepository)
  }

  public async createCOAGroup(COAGroup: COAGroup) {
    return this.COAGroupRepository.create(COAGroup)
  }

  public async deleteCOAGroup(id: IId) {
    return this.COAGroupRepository.delete(id)
  }

  public async updateCOAGroup(id: IId, COAGroup: COAGroup) {
    return this.COAGroupRepository.update(id, COAGroup)
  }

  public async findCOAGroup(COAGroup: COAGroup) {
    return this.COAGroupRepository.find(COAGroup)
  }
}
