import { Schema, model } from "mongoose";

// TODO : Replace with https://github.com/dropbox/zxcvbn

/**
 * Expires in 7 days
 * ? Temporarily store password in plain-text. Once the admin approves the user, it turns into salt/hash in to another table for registered users
 */
let registerVerificationSchema = new Schema({
  username: { type: String, lowercase: true, required: true },
  password: { type: String, required: true },
  
  email: { type: String, required: true },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  
  phoneNumber: { type: String, default: "" },

  creationDate: { type: Date, default: Date.now, required: true }
}, { createdAt: { type: Date, expires: 604800000 }, minimize: false });

export default model("RegisterVerification", registerVerificationSchema);