import { Schema, Document } from 'mongoose'

export interface IAppRoleResource {
  // id                   : number

  resourceId           : number

  appSysRoleId         : number

}

export default interface IAppRoleResourceDocument extends IAppRoleResource, Document {}
