import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const OrgModel = model(
  'Organization',
  new Schema(
    {
        name: { type: String, required: true },
        id: { type: String, required: true, unique: true },
        address: { type: String, default: "" },

        organizationGroupId: [ {type: ObjectId, ref: "OrganizationGroup"}],
        programId: [ {type: ObjectId, ref: "Program"}],
        users: [ { type: ObjectId, ref: "User" } ],
        authorizedPerson: {
              name: { type: String, default: "" },
              telephone: { type: String, default: "" },
              email: { type: String, default: ""}
        },
        locationName: { type: String, default: "" }
    }, { minimize: false }
  ),
  'Organization'
)

export default OrgModel
