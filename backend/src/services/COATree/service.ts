import ICOATreeService from './interface'
import COATree from '../../entities/COATree'
import { IId } from '../../models/interface'
import Container, { Service } from 'typedi'
import COATreeRepository from '../../repositories/COATree'

@Service()
export default class COATreeService implements ICOATreeService {
  private COATreeRepository: COATreeRepository

  constructor() {
    this.COATreeRepository = Container.get(COATreeRepository)
  }

  public async createCOATree(COATree: COATree) {
    return this.COATreeRepository.create(COATree)
  }

  public async deleteCOATree(id: IId) {
    return this.COATreeRepository.delete(id)
  }

  public async updateCOATree(id: IId, COATree: COATree) {
    return this.COATreeRepository.update(id, COATree)
  }

  public async updateSheetCOATrees(sheetNameId: IId, COATrees: Array<COATree>) {
    return this.COATreeRepository.updateBySheet(sheetNameId, COATrees)
  }

  public async findCOATree(COATree: COATree) {
    return this.COATreeRepository.find(COATree)
  }
}
