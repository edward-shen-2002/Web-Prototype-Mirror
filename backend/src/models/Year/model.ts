import { Schema, model } from 'mongoose'
import IYearDocument from './interface'

const YearModel = model<IYearDocument>(
  'Year',
  new Schema(
    {
      value: { type: String },
    },
    { minimize: false }
  )
)

export default YearModel
