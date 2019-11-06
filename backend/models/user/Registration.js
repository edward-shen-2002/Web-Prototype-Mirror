import { Schema, model } from "mongoose";

import { ROLE_LEVEL_NOT_APPLICABLE } from "../../constants/roles";

const defaultRoleControlConfig = { scope: ROLE_LEVEL_NOT_APPLICABLE, sectors: [], LHINs: [], organizations: [] };

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
    default: { 
      TEMPLATE_MANAGER: { ...defaultRoleControlConfig }, 
      PACKAGE_MANAGER: { ...defaultRoleControlConfig }, 
      USER_MANAGER: { ...defaultRoleControlConfig }, 
      ORGANIZATION_MANAGER: { ...defaultRoleControlConfig }, 
      LHIN_MANAGER: { ...defaultRoleControlConfig }, 
      SECTOR_MANAGER: { ...defaultRoleControlConfig }, 
      SYSTEM_MANAGER: { ...defaultRoleControlConfig }
    }
  },

  creationDate: { type: Date, default: Date.now, required: true }
}, { minimize: false });

export default model("Registration", registrationSchema);