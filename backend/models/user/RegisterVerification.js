import { Schema, model } from "mongoose";

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

  creationDate: { type: Date, default: Date.now, required: true }
}, { timestamps: true, minimize: false });

registerVerificationSchema.index({ createdAt: Date.now }, { expireAfterSeconds: 604800000 });

export default model("RegisterVerification", registerVerificationSchema);