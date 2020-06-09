import { Schema, model, Model } from 'mongoose'

import PassportLocalMongoose from 'passport-local-mongoose'

// TODO : Replace with https://github.com/dropbox/zxcvbn
const passwordValidator = (password, cb) => {
  // Symbols by ASCII ranges (http://www.asciitable.com/)
  const isGreaterThanMinLength = password.length > 7
  const isLessThanMaxLength = password.length < 26
  const containsSymbolRegex = /[$-/:-@{-~!'^_`\[\]]/
  const containsCapitalRegex = /[A-Z]/

  let error

  if (!isLessThanMaxLength) {
    error = 'Password has to be at least 8 characters long'
  } else if (!isGreaterThanMinLength) {
    error = 'Password has to be no more than 28 characters long'
  } else if (!containsSymbolRegex.test(password)) {
    error = 'Password has to contain at least one symbol'
  } else if (!containsCapitalRegex) {
    error = 'Password has to contain at least one capital character'
  }

  return error ? cb(error) : cb()
}

// Conditions to check for when the user authenticates/logs in
const findByUsername = (model, queryParameters) =>
  model.findOne({
    ...queryParameters,
    isActive: true,
    isEmailVerified: true,
    isApproved: true
  })

const User = new Schema(
  {
    username: { type: String, lowercase: true, required: true },

    email: { type: String, required: true },

    title: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },

    phoneNumber: { type: String, default: '' },

    isActive: { type: Boolean, required: true, default: true },
    isEmailVerified: { type: Boolean, required: true, default: false },

    creationDate: { type: Date, default: Date.now, required: true },
    approvedDate: { type: Date, default: Date.now, required: true },

    startDate: { type: Date },
    endDate: { type: Date }
  },
  { minimize: false }
)

User.plugin(PassportLocalMongoose, {
  usernameUnique: false,
  findByUsername,
  passwordValidator
})

const UserModel = model('User', User, 'User')

export default UserModel
