import { Schema, Document } from 'mongoose'

export interface IUserSYSRole {
  // id              : number

  userId          : number

  appSysRoleId    : number

  orgId           : number

  program         : object

}

export default interface IUserSYSRoleDocument extends IUserSYSRole, Document {}
