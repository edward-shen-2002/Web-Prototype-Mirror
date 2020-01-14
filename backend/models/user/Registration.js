import { Schema, model } from "mongoose";

import { DEFAULT_ROLES } from "../../constants/roles";

let registrationSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, required: true },
  
  email: { type: String, unique: true, required: true },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  
  phoneNumber: { type: String, default: "" },

  organizations: { type: Object, default: {} },
  LHINs: { type: Object, default: {} },

  roles: { 
    type: Object, 
    required: true,
    default: DEFAULT_ROLES
  },

  creationDate: { type: Date, default: Date.now, required: true }
}, { minimize: false });

export default model("Registration", registrationSchema);