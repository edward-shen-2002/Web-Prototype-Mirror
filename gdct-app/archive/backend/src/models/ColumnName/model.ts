import { Schema, model } from 'mongoose'
import IColumnNameDocument from './interface'

const ColumnNameModel = model<IColumnNameDocument>(
  'ColumnName',
  new Schema(
    {
      value: { type: String, required: true }
    },
    { minimize: false }
  ),
  'ColumnName'
)

export default ColumnNameModel
