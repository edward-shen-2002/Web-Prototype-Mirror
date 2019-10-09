import { Schema, model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

let userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  
  email: { type: String, unique: true, required: true },

  firstName: String,
  lastName: String,
  
  phoneNumber: String,
  
  validated: { type: Boolean, required: true, default: false },
  permissions: { type: Array, default: [] } ,

  createDate: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, required: true, default: true },

  // organization: { type: String, required: true },
  // groupNumber: { type: Number, required: true },
});

userSchema.plugin(passportLocalMongoose, {
  // Prevent inactive/banned accounts from logging in
  findByUsername: (model, queryParameters) => model.findOne({ ...queryParameters, active: true })
});

export default model("User", userSchema);
