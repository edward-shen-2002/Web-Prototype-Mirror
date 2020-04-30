import { Schema, Document } from 'mongoose'

export interface IAppResource {
  id                  : number

  resourceName        : string

  resourcePath        : string

  contextRoot         : string

  isProtected         : boolean

}

export default interface IAppResourceDocument extends IAppResource, Document {}
