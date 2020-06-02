import ColumnName from '../../entities/ColumnName'
import { IId } from '../../models/interface'

export default interface IColumnNameService {
  createColumnName: (columnName: ColumnName) => void
  deleteColumnName: (id: IId) => void
  updateColumnName: (id: IId, columnName: ColumnName) => void
  findColumnName: (columnName: ColumnName) => Promise<ColumnName[]>
}
