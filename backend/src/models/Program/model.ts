import { Schema, model } from 'mongoose'
import IProgramDocument from './interface'

const ProgramModel = model<IProgramDocument>(
  'Program',
  new Schema(
    {
      name: { type: String, required: true, unique: true },
      code: String
    },
    { minimize: false }
  ),
  'Program'
)

export default ProgramModel
