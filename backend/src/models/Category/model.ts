import { Schema, model } from 'mongoose'
import ICategoryDocument from './interface'

export default model<ICategoryDocument>(
  'Category', 
  new Schema(
    {
      value: { type: String, required: true }
    }, 
    { minimize: false }
  )
)
