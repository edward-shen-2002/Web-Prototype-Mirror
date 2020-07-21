import { Schema, model } from 'mongoose';

const OrgGroupModel = model(
  'OrganizationGroup',
  new Schema(
    {
      id: { type: String, required: true, unique: true },
      name: { type: String },
      isActive: { type: Boolean },
    },
    { minimize: false },
  ),
  'OrganizationGroup',
);

export default OrgGroupModel;
