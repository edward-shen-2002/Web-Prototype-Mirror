import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const organizationGroupSchema = new Schema({
  name: { type: String, required: true, unique: true },
  organizations: [{ organizationId: {type: ObjectId, ref:"Organization"} }]

}, { minimize: false });

export default model("OrganizationGroup", organizationGroupSchema);