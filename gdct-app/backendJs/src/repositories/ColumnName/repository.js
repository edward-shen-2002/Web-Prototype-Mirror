import ColumnNameEntity from '../../entities/ColumnName'
import BaseRepository from '../repository'
import ColumnNameModel from '../../models/ColumnName'

export default class ColumnNameRepository extends BaseRepository {
    async find(query) {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return ColumnNameModel.find(realQuery).then((columnNamees) =>
        columnNamees.map((columnName) => new ColumnNameEntity(columnName.toObject()))
      )
    }
}
