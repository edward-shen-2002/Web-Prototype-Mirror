// import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

dotenv.config();

const User = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    title: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    sysRole: [
      {
        type: Schema.ObjectId,
        ref: 'AppSysRole',
      },
    ],
    facebook: {
      id: String,
      token: String,
      name: String,
    },
    google: {
      id: String,
      token: String,
      name: String,
    },
    password: String,
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
  { timestamp: true, minimize: false },
);

User.methods.setHashedPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

User.methods.returnAuthUserJson = function (token) {
  return {
    _id: this._id,
    email: this.email,
    token,
  };
};

// var User = new Schema(
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
//   { collection: 'User' }
// );

// User.pre('save', async function (next) {
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// User.pre(/^find/, function (next) {
//   this.find({ isActive: { $ne: false } });
//   next();
// });

// User.methods.checkPassword = async function (password, userPassword) {
//   return await bcrypt.compare(password, userPassword);
// };

// User.plugin(PassportLocalMongoose, {
//   usernameUnique: false,
//   findByUsername,
//   passwordValidator,
// });

const UserModel = model('User', User, 'User');

export default UserModel;
