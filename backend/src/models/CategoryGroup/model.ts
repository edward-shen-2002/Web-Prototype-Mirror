import { Schema, model } from 'mongoose'
import ICategoryGroupDocument from './interface'

export default model<ICategoryGroupDocument>(
  'Group', 
  new Schema(
    {
      value: { type: String, required: true }
    }, 
    { minimize: false }
  )
)
