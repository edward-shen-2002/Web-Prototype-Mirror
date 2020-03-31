import { Schema, model } from "mongoose";

import { DEFAULT_ROLES } from "../../constants/roles";

let registrationSchema = new Schema({
  userId: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, required: true },
  title: { type: String, required: true },

  email: { type: String, unique: true, required: true },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },

  phoneNumber: { type: String, default: "" },

  organizationGroup: { type: Object, default: {} },
  organizations: { type: Object, default: {} },
  programs: [{ type: Object, default: {}}],
  submission:[{id: { type: Object}, permission: [{
      Approve: {type: Boolean},
      Review: {type: Boolean},
      Submit: {type: Boolean},
      Input: {type: Boolean},
      View: {type: Boolean},
      ViewCognos: {type: Boolean},
    }]}],

  approveStatus: { type: String, default: "Unapproved" },
  creationDate: { type: Date, default: Date.now, required: true }
}, { minimize: false });

export default model("Registration", registrationSchema);