import { Schema, model } from 'mongoose';
import IOrganizationDocument from './interface';
import {IId} from "../interface";

const ObjectId = Schema.Types.ObjectId;

export default model<IOrganizationDocument>(
  'Organization',
  new Schema(
    {
      // id                  : { type: Number },
      IFISNum             : { type: String, default: '' },

      name                : { type: String, required: true },
      legalName           : { type: String, required: true },
      code                : { type: String, required: true, unique: true },
      address             : { type: String, default: '' },
      postalCode          : { type: String, default: '' },
      provice             : { type: String, default: '' },
      city                : { type: String, default: '' },

      organizationGroupId : { type: ObjectId, ref: 'OrganizationGroup' },

      contactUserId       : { type: ObjectId, ref: 'User' },
      CFOUserId           : { type: ObjectId, ref: 'User' },
      signingAuthorityUserId : { type: ObjectId, ref: 'User' },

      location            : { type: String, default: '' },

      programIds          : [ { type: ObjectId, ref: 'Program' } ],
      isActive              : { type: Boolean, default: false }
    },
    { minimize: false }
  )
);
