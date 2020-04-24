import IColumnNameRepository from './interface'
import ColumnName from '../../entities/ColumnName'

export default class ColumnNameRepository
  implements IColumnNameRepository<ColumnName> {
  create(item: IColumnNameRepository<ColumnName>): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  update(
    id: string,
    item: IColumnNameRepository<ColumnName>
  ): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }
  find(
    item: IColumnNameRepository<ColumnName>
  ): Promise<IColumnNameRepository<ColumnName>[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<IColumnNameRepository<ColumnName>> {
    throw new Error('Method not implemented.')
  }
}
