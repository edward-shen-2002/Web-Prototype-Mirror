import ISheetNameService from './interface'
import SheetName from '../../entities/SheetName'
import { IId } from '../../models/interface'
import Container, { Service, Inject } from 'typedi'
import SheetNameRepository from '../../repositories/SheetName'

@Service()
export default class SheetNameService implements ISheetNameService {
  private sheetNameRepository: SheetNameRepository

  constructor() {
    this.sheetNameRepository = Container.get(SheetNameRepository)
  }

  public async createSheetName(sheetName: SheetName) {
    return this.sheetNameRepository.create(sheetName)
  }

  public async deleteSheetName(id: IId) {
    return this.sheetNameRepository.delete(id)
  }

  public async updateSheetName(id: IId, sheetName: SheetName) {
    return this.sheetNameRepository.update(id, sheetName)
  }

  public async findSheetName(sheetName: SheetName) {
    return this.sheetNameRepository.find(sheetName)
  }
}
