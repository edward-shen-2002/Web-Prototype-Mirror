import { Schema, model } from 'mongoose'

const ProgramModel = model(
  'Program',
  new Schema(
    {
      name: { type: String, required: true },
      code: { type: String },
      isActive: { type: Boolean }
    },
    { minimize: false, timestamps: true }
  ),
  'Program'
)

export default ProgramModel
