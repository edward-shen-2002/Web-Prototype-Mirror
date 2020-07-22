import { Schema, model } from 'mongoose'

const COAModel = model(
  'Category',
  new Schema(
    {
      name: { type: String }
    }, 
    { minimize: false }
  ),
  'Category'
)

export default COAModel
