import ICOAService from './interface'
import COA from '../../entities/COA'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import COARepository from '../../repositories/COA'

@Service()
export default class COAService implements ICOAService {
  private COARepository: COARepository

  constructor() {
    this.COARepository = Container.get(COARepository)
  }

  public async createCOA(COA: COA) {
    return this.COARepository.create(COA)
  }

  public async deleteCOA(id: IId) {
    return this.COARepository.delete(id)
  }

  public async updateCOA(id: IId, COA: COA) {
    return this.COARepository.update(id, COA)
  }

  public async findCOA(COA: COA) {
    return this.COARepository.find(COA)
  }
}
