import { Schema, model } from 'mongoose'

const AppSysModel = model(
  'AppSys',
  new Schema(
    {
      code: { type: String },
      name: { type: String }
    },
    { minimize: false }
  ),
  'AppSys'
)

export default AppSysModel
