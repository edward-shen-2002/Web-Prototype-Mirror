import { Schema, model } from 'mongoose'

const AppSysRoleModel = model(
  'AppSysRole',
  new Schema(
    {
      appSys: { type: String },
      role: { type: String }
    },
    { minimize: false }
  ),
  'AppSysRole'
)

export default AppSysRoleModel
