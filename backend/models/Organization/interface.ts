import { Schema, Document } from 'mongoose';

interface IOrganization {
  name                : string
  code                : string
  address: string
  
  organizationGroupID : Schema.Types.ObjectId

  managerUserIDs      : Array<Schema.Types.ObjectId>
  contactUserID       : Schema.Types.ObjectId
  authorizedUserID    : Schema.Types.ObjectId

  location            : string
  programIDs          : Array<Schema.Types.ObjectId>
}

export default interface IOrganizationDocument extends IOrganization, Document {}
