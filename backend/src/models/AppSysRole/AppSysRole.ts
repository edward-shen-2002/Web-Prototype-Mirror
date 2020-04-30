import { Schema, model } from 'mongoose';
import IAppSysRoleDocument from './interface'

export default model<IAppSysRoleDocument>(
  'AppSysRole',
  new Schema(
    {
      id              : { type: Number},

      appId           : { type: Number},

      sysId           : { type: Number},
    },
    { minimize: false }
  )
)
