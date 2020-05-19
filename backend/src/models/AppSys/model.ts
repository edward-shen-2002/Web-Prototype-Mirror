import { Schema, model } from 'mongoose'
import IAppSysDocument from './interface'

const AppSysModel = model<IAppSysDocument>(
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
