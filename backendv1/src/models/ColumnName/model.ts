import { Schema, model } from 'mongoose'
import IColumnNameDocument from './interface'

export default model<IColumnNameDocument>(
  'ColumnName', 
  new Schema(
    {
      value: { type: String, required: true }
    }, 
    { minimize: false }
  )
)
