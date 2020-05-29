import { Document } from 'mongoose'
import { IId } from '../interface';

export interface IAppRoleResource {
  appResourceId: IId
  appSysRoleId: IId
}

export default interface IAppRoleResourceDocument extends IAppRoleResource, Document {}
