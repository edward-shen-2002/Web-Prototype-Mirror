import { Schema, model } from 'mongoose'

const ProgramModel = model(
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
