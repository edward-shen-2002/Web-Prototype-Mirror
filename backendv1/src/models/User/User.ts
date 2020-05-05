import { Schema, model, Model } from 'mongoose'

import PassportLocalMongoose from 'passport-local-mongoose'

import IUserDocument from './interface'

// TODO : Replace with https://github.com/dropbox/zxcvbn
const passwordValidator = (password: string, cb: (error?: string) => any) => {
  // Symbols by ASCII ranges (http://www.asciitable.com/)
  const isGreaterThanMinLength = password.length > 7
  const isLessThanMaxLength = password.length < 26
  const containsSymbolRegex = /[$-/:-@{-~!'^_`\[\]]/
  const containsCapitalRegex = /[A-Z]/

  let error: string

  if(!isLessThanMaxLength) {
    error = 'Password has to be at least 8 characters long'
  } else if(!isGreaterThanMinLength) {
    error = 'Password has to be no more than 28 characters long'
  } else if(!containsSymbolRegex.test(password)) {
    error = 'Password has to contain at least one symbol'
  } else if(!containsCapitalRegex) {
    error = 'Password has to contain at least one capital character'
  }

  return error ? cb(error) : cb()
}

// Conditions to check for when the user authenticates/logs in
const findByUsername = (
  model: Model<IUserDocument>,
  queryParameters: object
) => (
  model.findOne(
    {
      ...queryParameters,
      isActive: true,
      isVerified: true
    }
  )
)

const User = new Schema(
  {
    // id                : { type: Number, required: true },
    userName          : { type: String, lowercase: true, required: true },

    email             : { type: String, required: true },

    title             : { type: String, default: '' },
    firstName         : { type: String, default: '' },
    lastName          : { type: String, default: '' },

    phoneNumber       : { type: String, default: '' },
    //
    // organizations     : { type: Object, default: {} },

    active            : { type: Boolean, required: true, default: false },
    isVerified        : { type: Boolean, required: true, default: false },

    createDate        : { type: Date, default: Date.now, required: true },
    approveDate       : { type: Date, default: Date.now, required: true },

    startDate         : { type: Date, default: Date.now, required: true },
    endDate           : { type: Date, default: Date.now, required: true },
  },
  { minimize: false }
)


User.plugin(PassportLocalMongoose, { usernameUnique: false, findByUsername, passwordValidator })

export default model<IUserDocument>('User', User)
/**
 Organization: {
        $[organization]: {

          programs: {
            $[program]: {
              submissions: {
                $[submission]
              }
            }
          }

        }
      }
 */
