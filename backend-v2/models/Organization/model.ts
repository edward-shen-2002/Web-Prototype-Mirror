import { Schema, model } from 'mongoose';
import IOrganizationDocument from './interface';

const ObjectId = Schema.Types.ObjectId;

export default model<IOrganizationDocument>(
  'Organization', 
  new Schema(
    {
      name: { type: String, required: true },
      code: { type: String, required: true, unique: true },
      address: { type: String, default: '' },
      
      organizationGroupID: { type: ObjectId, ref: 'OrganizationGroup' },
    
      managerUserIDs: [ { type: ObjectId, ref: 'User' } ],
      contactUserID: { type: ObjectId, ref: 'User' },
      authorizedUserID: { type: ObjectId, ref: 'User' },
    
      location: { type: String, default: '' },
    
      programIDs: [ { type: ObjectId, ref: 'Program' } ]
    }, 
    { minimize: false }
  )
);
