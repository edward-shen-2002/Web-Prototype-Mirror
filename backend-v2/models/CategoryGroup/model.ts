import { Schema, model } from 'mongoose'
import ICategoryGroupModel from './interface'

export default model<ICategoryGroupModel>(
  'Group', 
  new Schema(
    {
      value: { type: String, required: true }
    }, 
    { minimize: false }
  )
)
