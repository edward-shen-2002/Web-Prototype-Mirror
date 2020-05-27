import { Schema, model } from 'mongoose'
import IAppSysRoleDocument from './interface'

const AppSysRoleModel = model<IAppSysRoleDocument>(
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
