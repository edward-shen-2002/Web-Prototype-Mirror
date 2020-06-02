import IColumnNameService from './interface'
import ColumnName from '../../entities/ColumnName'
import { IId } from '../../models/interface'
import Container, { Service, Inject } from 'typedi'
import ColumnNameRepository from '../../repositories/ColumnName'

@Service()
export default class ColumnNameService implements IColumnNameService {
  private columnNameRepository: ColumnNameRepository

  constructor() {
    this.columnNameRepository = Container.get(ColumnNameRepository)
  }

  public async createColumnName(columnName: ColumnName) {
    return this.columnNameRepository.create(columnName)
  }

  public async deleteColumnName(id: IId) {
    return this.columnNameRepository.delete(id)
  }

  public async updateColumnName(id: IId, columnName: ColumnName) {
    return this.columnNameRepository.update(id, columnName)
  }

  public async findColumnName(columnName: ColumnName) {
    return this.columnNameRepository.find(columnName)
  }
}
