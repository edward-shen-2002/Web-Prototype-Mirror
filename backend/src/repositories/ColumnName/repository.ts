import IColumnNameRepository from './interface'
import ColumnNameEntity from '../../entities/ColumnName'
import BaseRepository from '../repository'

export default class ColumnNameRepository extends BaseRepository<ColumnNameEntity>
  implements IColumnNameRepository<ColumnNameEntity> {

}
