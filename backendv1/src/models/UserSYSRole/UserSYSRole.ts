import { Schema, model } from 'mongoose';
import IUserSYSRoleDocument from './interface'

const ObjectId = Schema.Types.ObjectId

export default model<IUserSYSRoleDocument>(
  'UserSYSRole',
  new Schema(
  {
    // id                : { type: Number},

    userId          : { type: Number},

    appSysRoleId    : { type: Number},

    orgId           : { type: Number},

    program         : { type: ObjectId},
  },
  { minimize: false }
  )
)
