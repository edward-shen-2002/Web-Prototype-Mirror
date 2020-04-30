import { Schema, Document } from 'mongoose'

export interface IAppRole {
  id              : number

  code            : string

  name            : string

}

export default interface IAppRoleDocument extends IAppRole, Document {}
