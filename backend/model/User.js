import { Schema, model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

let userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },

  firstName: String,
  lastName: String,

  createDate: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, required: true, default: true },

  // phoneNumber: String,
  // organization: { type: String, required: true },
  // validated: { type: Boolean, required: true, default: false },
  // email: { type: String, unique: true, required: true },
  // groupNumber: { type: Number, required: true },
  // permissions: { type: Array } 
});

userSchema.plugin(passportLocalMongoose, {
  // Prevent inactive/banned accounts from logging in
  findByUsername: (model, queryParameters) => model.findOne({ ...queryParameters, active: true })
});

export default model("User", userSchema);
