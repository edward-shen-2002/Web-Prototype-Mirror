import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const AppRoleModel = model(
  'AppRole',
  new Schema(
    {
      code: { type: String },
      name: { type: String }
    },
    { minimize: false, autoIndex: true }
  ),
  'AppRole'
)

export default AppRoleModel
