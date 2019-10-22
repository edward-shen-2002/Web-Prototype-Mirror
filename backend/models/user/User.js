import { Schema, model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

let userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  
  email: { type: String, unique: true, required: true },

  firstName: String,
  lastName: String,
  
  phoneNumber: String,

  roles: { type: Array, default: [] },

  creationDate: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, required: true, default: true },

  organization: { type: Array, default: [] }
});

userSchema.plugin(passportLocalMongoose, {
  // Prevent inactive/banned accounts from logging in
  findByUsername: (model, queryParameters) => model.findOne({ ...queryParameters, active: true })
});

export default model("User", userSchema);
