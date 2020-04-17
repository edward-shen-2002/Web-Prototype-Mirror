import { Document } from 'mongoose';
import { IId } from '../interface';

export interface IOrganization {
  name                      : string
  legalName                 : string
  
  IFISNumber                : string
  code                      : string
  
  address                   : string
  postalCode                : string
  province                  : string
  city                      : string

  organizationGroupId       : IId

  
  CFOUserId                 : IId
  signingAuthorityUserId    : IId
  contactUserId             : IId

  location                  : string
  programIds                : Array<IId>

  isActive                  : boolean
}

export default interface IOrganizationDocument extends IOrganization, Document {}
