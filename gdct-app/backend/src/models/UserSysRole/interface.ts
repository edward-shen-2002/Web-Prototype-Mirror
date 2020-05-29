import { Document } from 'mongoose'
import { IId } from '../interface';

export interface IUserSysRole {
  userId: IId
  appSysRoleId: IId
  organizationId: IId
  programId: IId
}

export default interface IUserSysRoleDocument extends IUserSysRole, Document {}
