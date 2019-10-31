import { Schema, model } from "mongoose";

let registrationSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, required: true },
  
  email: { type: String, unique: true, required: true },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  
  phoneNumber: { type: String, default: "" },

  creationDate: { type: Date, default: Date.now, required: true }
}, { minimize: false });

export default model("Registration", registrationSchema);