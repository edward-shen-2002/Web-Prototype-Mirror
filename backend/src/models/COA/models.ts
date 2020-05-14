import { Schema, model } from 'mongoose'
import ICOADocument from './interface'

const COAModel = model<ICOADocument>(
  'COA',
  new Schema(
    {
      name: { type: String }
    }, 
    { minimize: false }
  )
)

export default COAModel
