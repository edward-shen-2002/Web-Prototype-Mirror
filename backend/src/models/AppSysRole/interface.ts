import { Document } from 'mongoose'

export interface IAppSysRole {
  appSys: string
  role: string
}

export default interface IAppSysRoleDocument extends IAppSysRole, Document { }
