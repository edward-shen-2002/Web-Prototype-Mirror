import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let organizationSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  address: { type: String, default: "" },
  sector: {
    sectorId: { type: ObjectId, ref: "Sector" },
    name: { type: String }
  },
  organizationGroup: {
    organizationGroupId: { type: ObjectId, ref: "OrganizationGroup" },
    name: { type: String }
  },
  users: [ { type: ObjectId, ref: "User" } ], 
  managers: [ { type: ObjectId, ref: "User" } ],
  contact: {
    userId: { type: ObjectId, ref: "User" },
    name: { type: String, default: "" },
    telephone: { type: String, default: "" },
    email: {type: String, default: ""}
  },
  program: [ { type: ObjectId, ref: "Program" } ],
  locationName: { type: String, default: "" }
}, { minimize: false });

export default model("Organization", organizationSchema);
