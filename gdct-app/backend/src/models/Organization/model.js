import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const OrganizationModel = model(
  'Organization',
  new Schema(
    {
      name: { type: String, required: true },
      code: { type: String, required: true, unique: true },
      address: { type: String, default: '' },

      organizationGroupId: { type: ObjectId, ref: 'OrganizationGroup' },

      managerUserIds: [{ type: ObjectId, ref: 'User' }],
      contactUserId: { type: ObjectId, ref: 'User' },
      authorizedUserId: { type: ObjectId, ref: 'User' },

      location: { type: String, default: '' },

      programIds: [{ type: ObjectId, ref: 'Program' }]
    },
    { minimize: false }
  ),
  'Organization'
)

export default OrganizationModel
