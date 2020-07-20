import { Schema, model } from 'mongoose';

const AppSysRole = new Schema(
  {
    appSys: { type: String },
    role: { type: String },
    isActive: { type: Boolean },
  },
  { minimize: false },
);

AppSysRole.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const AppSysRoleModel = model('AppSysRole', AppSysRole, 'AppSysRole');

export default AppSysRoleModel;
