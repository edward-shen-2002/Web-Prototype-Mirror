import { Schema, Document } from 'mongoose';
import { IId } from '../interface';

export interface IOrganization {
  name                : string
  code                : string
  address             : string
  
  organizationGroupId : IId

  managerUserIds      : Array<IId>
  contactUserId       : IId
  authorizedUserId    : IId

  location            : string
  programIds          : Array<IId>
}

export default interface IOrganizationDocument extends IOrganization, Document {}
