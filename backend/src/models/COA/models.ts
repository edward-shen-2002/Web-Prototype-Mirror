import { Schema, model } from 'mongoose'
import ICOA from './interface'

const ObjectId = Schema.Types.ObjectId

const COAModel = model<ICOA>(
  'COA',
  new Schema(
    {
      name: { type: String }
    }, 
    { minimize: false }
  )
)

export default COAModel
