import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let organizationSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  address: { type: String, default: "" },
  sector: {
    sectorId: { type: ObjectId, ref: "Sector", required: true },
    name: { type: String, required: true }
  },
  users: [ { type: ObjectId, ref: "User" } ], 
  managers: [ { type: ObjectId, ref: "User" } ],
  contact: {
    userId: { type: ObjectId, ref: "User" },
    name: { type: String, default: "" },
    telephone: { type: String, default: "" }
  }
});

export default model("Organization", organizationSchema);
