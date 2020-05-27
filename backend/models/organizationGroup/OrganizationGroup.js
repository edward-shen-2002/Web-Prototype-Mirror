import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const organizationGroupSchema = new Schema({
  id : {type: String, required: true, unique: true },
  name: { type: String},
  isActive: {type: Boolean}

}, { minimize: false });

export default model("OrganizationGroup", organizationGroupSchema, "OrganizationGroup");