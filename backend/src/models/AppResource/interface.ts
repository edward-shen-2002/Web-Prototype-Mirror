import { Document } from 'mongoose'
import { IId } from '../interface';

export interface IAppResource {
  name: string
  path: string
  contextRoot: string
  isProtected: boolean
}

export default interface IAppResourceDocument extends IAppResource, Document {}
