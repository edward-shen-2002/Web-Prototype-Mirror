import { Schema, model } from 'mongoose';
import IAppRoleResourceDocument from './interface'

export default model<IAppRoleResourceDocument>(
  'AppRoleResource',
  new Schema(
    {
      id              : { type: Number},

      resourceId    : { type: Number},

      appSysRoleId    : { type: Number}

    },
    { minimize: false }
  )
)
