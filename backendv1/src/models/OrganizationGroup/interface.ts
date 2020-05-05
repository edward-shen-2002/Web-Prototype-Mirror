import { Document } from 'mongoose';

export interface IOrganizationGroup {
  id        : number
  name      : string
  isActive  : boolean
}

export default interface IOrganizationGroupDocument extends IOrganizationGroup, Document {}
