import { Schema, model } from 'mongoose'
import ICOAGroup from './interface'

const ObjectId = Schema.Types.ObjectId

const COAGroupModel = model<ICOAGroup>(
  'COAGroup',
  new Schema(
    {
      name: { type: String },
      code: { type: String },
      isActive: { type: Boolean }
    }, 
    { minimize: false }
  )
)

export default COAGroupModel
