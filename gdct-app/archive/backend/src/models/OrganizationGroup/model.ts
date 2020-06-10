import { Schema, model } from 'mongoose'

import IOrganizationGroupDocument from './interface'

const OrganizationGroupModel = model<IOrganizationGroupDocument>(
  'OrganizationGroup',
  new Schema(
    {
      name: { type: String, required: true, unique: true }
    },
    { minimize: false }
  ),
  'OrganizationGroup'
)

export default OrganizationGroupModel
