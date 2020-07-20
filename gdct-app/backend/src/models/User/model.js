import bcrypt from 'bcrypt';
import { Schema, model, Model } from 'mongoose';

import PassportLocalMongoose from 'passport-local-mongoose';

const ObjectId = Schema.Types.ObjectId;

// TODO : Replace with https://github.com/dropbox/zxcvbn
const passwordValidator = (password, cb) => {
  // Symbols by ASCII ranges (http://www.asciitable.com/)
  const isGreaterThanMinLength = password.length > 7;
  const isLessThanMaxLength = password.length < 26;
  const containsSymbolRegex = /[$-/:-@{-~!'^_`\[\]]/;
  const containsCapitalRegex = /[A-Z]/;

  let error;

  if (!isLessThanMaxLength) {
    error = 'Password has to be at least 8 characters long';
  } else if (!isGreaterThanMinLength) {
    error = 'Password has to be no more than 28 characters long';
  } else if (!containsSymbolRegex.test(password)) {
    error = 'Password has to contain at least one symbol';
  } else if (!containsCapitalRegex) {
    error = 'Password has to contain at least one capital character';
  }

  return error ? cb(error) : cb();
};

// Conditions to check for when the user authenticates/logs in
const findByUsername = (model, queryParameters) =>
  model.findOne({
    ...queryParameters,
    isActive: true,
    isEmailVerified: true,
    isApproved: true,
  });

const User = new Schema(
  {
    username: { type: String, lowercase: true, required: true },

    email: { type: String, required: true },

    title: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },

    phoneNumber: { type: String, default: '' },

    password: { type: String, required: true, select: false },
    sysRole: [
      {
        type: Schema.ObjectId,
        ref: 'AppSysRole',
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    isEmailVerified: { type: Boolean, required: true, default: false },

    creationDate: { type: Date, default: Date.now, required: true },
    approvedDate: { type: Date, default: Date.now, required: true },

    startDate: { type: Date },
    endDate: { type: Date },
  },
  { minimize: false }
);
// TODO: Hoanan
// const User = new Schema(
//   {
//     username: { type: String, unique: true, required: true },
//     hashedUsername: { type: String, default: '' },
//     title: { type: String, default: '' },
//     ext: { type: String, default: '' },
//     email: { type: String, required: true },

//     firstName: { type: String, default: '' },
//     lastName: { type: String, default: '' },

//     phoneNumber: { type: String, default: '' },
//     sysRole: [
//       {
//         appSys: { type: String, default: '' },
//         role: { type: String, default: '' },
//         org: [
//           {
//             orgId: { type: String, default: '' },
//             orgName: { type: String, default: '' },
//             IsActive: { type: Boolean },
//             program: [
//               {
//                 programId: { type: ObjectId, ref: 'program' },
//                 programCode: { type: String, default: '' },
//                 template: [
//                   {
//                     templateTypeId: { type: ObjectId, ref: 'templateType' },
//                     templateCode: { type: String, default: '' },
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],

//     startDate: { type: Date, default: Date.now, required: true },
//     endDate: { type: Date, default: Date.now, required: true },
//     IsActive: { type: Boolean, required: true, default: true },
//   },
//   { minimize: false }
// );

User.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

User.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

User.methods.checkPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

User.plugin(PassportLocalMongoose, {
  usernameUnique: false,
  findByUsername,
  passwordValidator,
});

const UserModel = model('User', User, 'User');

export default UserModel;
