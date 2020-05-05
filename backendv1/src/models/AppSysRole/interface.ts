import { Schema, Document } from 'mongoose'

export interface IAppSysRole {
  // id              : number

  appId           : number

  sysId           : number
}

export default interface IAppSysRoleDocument extends IAppSysRole, Document {}
