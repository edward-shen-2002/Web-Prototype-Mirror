import { Document } from 'mongoose'

export interface IAppRole {
  code: string
  name: string
}

export default interface IAppRoleDocument extends IAppRole, Document {}
