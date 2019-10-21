import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let organizationSchema = new Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
  sector: { type: ObjectId, ref: "Sector", required: true },
  users: [ { type: ObjectId, ref: "User" } ],
  managers: [ { type: ObjectId, ref: "User" } ],
  types: [ { type: ObjectId, ref: "OrganizationType" } ]
});

export default model("Organization", organizationSchema);
