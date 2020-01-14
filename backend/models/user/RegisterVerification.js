import { Schema, model } from "mongoose";

import { ROLE_LEVEL_NOT_APPLICABLE } from "../../constants/roles";

const defaultRoleControlConfig = { scope: ROLE_LEVEL_NOT_APPLICABLE, sectors: [], LHINs: [], organizations: [] };

// TODO : Replace with https://github.com/dropbox/zxcvbn

/**
 * Expires in 7 days
 * ? Temporarily store password in plain-text. Once the admin approves the user, it turns into salt/hash in to another table for registered users
 * 
 * Expiry: https://stackoverflow.com/questions/22106271/mongoose-change-ttl-for-a-single-document
 */
let registerVerificationSchema = new Schema({
  username: { type: String, lowercase: true, required: true },
  password: { type: String, required: true },
  
  email: { type: String, required: true },

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
      BUNDLE_MANAGER: { ...defaultRoleControlConfig }, 
      USER_MANAGER: { ...defaultRoleControlConfig }, 
      ORGANIZATION_MANAGER: { ...defaultRoleControlConfig }, 
      LHIN_MANAGER: { ...defaultRoleControlConfig }, 
      SECTOR_MANAGER: { ...defaultRoleControlConfig }, 
      SYSTEM_MANAGER: { ...defaultRoleControlConfig }
    }
  },

  creationDate: { type: Date, default: Date.now, required: true }
}, { timestamps: true, minimize: false });

registerVerificationSchema.index({ createdAt: Date.now }, { expireAfterSeconds: 604800000 });

export default model("RegisterVerification", registerVerificationSchema);