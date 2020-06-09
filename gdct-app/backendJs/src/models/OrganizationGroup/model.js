import { Schema, model } from 'mongoose'

const OrganizationGroupModel = model(
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
