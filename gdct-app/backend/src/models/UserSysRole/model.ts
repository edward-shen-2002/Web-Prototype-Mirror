import { Schema, model } from 'mongoose'
import IUserSysRoleDocument from './interface'

const ObjectId = Schema.Types.ObjectId

const UserSysRoleModel = model<IUserSysRoleDocument>(
  'UserSysRole',
  new Schema(
    {
      userId: { type: ObjectId, ref: "User" },
      appSysRoleId: { type: ObjectId, ref: "AppSysRole" },
      organizationId: { type: ObjectId, ref: "Organization" },
      programId: { type: ObjectId, ref: "Program" }
    },
    { minimize: false }
  ),
  'UserSysRole'
)

export default UserSysRoleModel
