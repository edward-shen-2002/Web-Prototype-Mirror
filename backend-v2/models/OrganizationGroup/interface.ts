import { Schema, Document } from 'mongoose';

interface IOrganizationGroup {
  name: string
}

export default interface IOrganizationGroupDocument extends IOrganizationGroup, Document {}