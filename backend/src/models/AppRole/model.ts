import { Schema, model } from 'mongoose'
import IAppRoleDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const AppRoleModel = model<IAppRoleDocument>(
  'AppRole',
  new Schema(
    {
      code: { type: String },
      name: { type: String }
    },
    { minimize: false, autoIndex: true }
  )
)

export default AppRoleModel
