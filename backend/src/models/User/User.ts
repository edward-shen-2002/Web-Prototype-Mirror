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
      isEmailVerified: true,
      isApproved: true
    }
  )
)

const User = new Schema(
  {
    username          : { type: String, lowercase: true, required: true },
    
    email             : { type: String, required: true },

    title             : { type: String, default: '' },
    firstName         : { type: String, default: '' },
    lastName          : { type: String, default: '' },
    
    phoneNumber       : { type: String, default: '' },

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
    organizations     : { type: Object, default: {} },
    
    isActive          : { type: Boolean, required: true, default: true },
    isEmailVerified   : { type: Boolean, required: true, default: false },
    isApproved        : { type: Boolean, required: true, default: false },

    creationDate      : { type: Date, default: Date.now, required: true },
    approvedDate      : { type: Date, default: Date.now, required: true }
  }, 
  { minimize: false }
)

User.plugin(PassportLocalMongoose, { usernameUnique: false, findByUsername, passwordValidator })

const UserModel = model<IUserDocument>('User', User)

export default UserModel