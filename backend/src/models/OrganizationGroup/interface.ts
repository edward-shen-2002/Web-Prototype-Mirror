import { Document } from 'mongoose';

export interface IOrganizationGroup {
  name: string
}

export default interface IOrganizationGroupDocument extends IOrganizationGroup, Document {}