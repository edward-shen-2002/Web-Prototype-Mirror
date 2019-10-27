import { Schema, model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

// TODO : Replace with https://github.com/dropbox/zxcvbn
const passwordValidator = (password, cb) => {
  // Symbols by ASCII ranges (http://www.asciitable.com/)
  const isGreaterThanMinLength = password.length > 7;
  const isLessThanMaxLength = password.length < 26;
  const containsSymbolRegex = /[$-/:-@{-~!"^_`\[\]]/;
  const containsCapitalRegex = /[A-Z]/;

  let error;

  if(!isLessThanMaxLength) {
    error = "Password has to be at least 8 characters long";
  } else if(!isGreaterThanMinLength) {
    error = "Password has to be no more than 28 characters long";
  } else if(!containsSymbolRegex.test(password)) {
    error = "Password has to contain at least one symbol";
  } else if(!containsCapitalRegex) {
    error = "Password has to contain at least one capital character";
  }

  return error ? cb(error) : cb();
};  

// Prevent inactive/banned accounts from logging in
const findByUsername = (model, queryParameters) => model.findOne({ ...queryParameters, active: true });

let userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  
  email: { type: String, unique: true, required: true },

  firstName: String,
  lastName: String,
  
  phoneNumber: String,

  // ?roles: { role: { level, occupieedOrganizations, occupiedLhins } }
  roles: { 
    type: Object, 
    default: { 
      DATA_MANAGER: {
        scope: "N/A",
        LHINs: [],
        organizations: []
      }, 
      TEMPLAGE_MANAGER: {
        scope: "N/A",
        LHINs: [],
        organizations: []
      }, 
      PACKAGE_MANAGER: {
        scope: "N/A",
        LHINs: [],
        organizations: []
      }, 
      USER_MANAGER: {
        scope: "N/A",
        LHINs: [],
        organizations: []
      }, 
      ORGANIZATION_MANAGER: {
        scope: "N/A",
        LHINs: [],
        organizations: []
      }
    } 
  },

  creationDate: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, required: true, default: true },

  organization: { type: Array, default: [] }
});

userSchema.plugin(passportLocalMongoose, { findByUsername, passwordValidator });

export default model("User", userSchema);

// Template manager
// Cell Data manager
// Organization manager
// User manager
// Package manager

// Unsure: 
// Sector manager
// System manager