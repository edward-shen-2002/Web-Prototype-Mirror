import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let organizationSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  address: { type: String, default: "" },
  // sector: {
  //   sectorId: { type: ObjectId, ref: "Sector" },
  //   name: { type: String }
  // },
  organizationGroupId: [ {type: ObjectId, ref: "OrganizationGroup"}],
  programId: [ {type: ObjectId, ref: "Program"}],
  users: [ { type: ObjectId, ref: "User" } ],
  authorizedPerson: {
    name: { type: String, default: "" },
    telephone: { type: String, default: "" },
    email: { type: String, default: ""}
  },
  locationName: { type: String, default: "" }
}, { minimize: false });

export default model("Organization", organizationSchema, "Organization");
