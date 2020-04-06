import { Schema, model } from "mongoose";

const organizationGroupSchema = new Schema({
  name: { type: String, required: true, unique: true }
}, { minimize: false });

export default model("OrganizationGroup", organizationGroupSchema);