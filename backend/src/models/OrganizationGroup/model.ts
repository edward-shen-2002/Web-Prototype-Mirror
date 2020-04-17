import { Schema, model } from 'mongoose';

import IOrganizationGroupDocument from './interface'

export default model<IOrganizationGroupDocument>(
  'OrganizationGroup', 
  new Schema(
    {
      name: { type: String, required: true, unique: true }
    }, 
    { minimize: false }
  )
);