import { Schema, model } from 'mongoose'
import ICOAGroupDocument from './interface'

const COAGroupModel = model<ICOAGroupDocument>(
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
