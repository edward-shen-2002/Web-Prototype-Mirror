import IColumnNameRepository from './interface'
import ColumnNameEntity from '../../entities/ColumnName'
import BaseRepository from '../repository'
import ColumnNameModel from '../../models/ColumnName'

export default class ColumnNameRepository extends BaseRepository<ColumnNameEntity>
  implements IColumnNameRepository<ColumnNameEntity> {
    public async find(query: ColumnNameEntity): Promise<ColumnNameEntity[]> {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return ColumnNameModel.find(realQuery).then((columnNamees) =>
        columnNamees.map((columnName) => new ColumnNameEntity(columnName.toObject()))
      )
    }
}
