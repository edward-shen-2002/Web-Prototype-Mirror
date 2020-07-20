import { Schema, model } from 'mongoose'

const COAGroupModel = model(
  'COAGroup',
  new Schema(
    {
      name: { type: String },
      code: { type: String },
      isActive: { type: Boolean }
    }, 
    { minimize: false }
  ),
  'COAGroup'
)

export default COAGroupModel
