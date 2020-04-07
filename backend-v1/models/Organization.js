import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let organizationSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  address: { type: String, default: "" },
  
  organizationGroupID: { type: ObjectId, ref: "OrganizationGroup" },

  managerUserIDs: [ { type: ObjectId, ref: "User" } ],
  contactUserID: { type: ObjectID, ref: "User" },
  authorizedUserID: { type: ObjectID, ref: "User" },

  location: { type: String, default: "" },

  programIDs: [ { type: ObjectId, ref: "Program" } ]
}, { minimize: false });

export default model("Organization", organizationSchema);
