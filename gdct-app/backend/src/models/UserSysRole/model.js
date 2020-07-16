import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const UserSysRoleModel = model(
  'UserSysRole',
  new Schema(
    {
      userId: { type: ObjectId, ref: 'User' },
      appSysRoleId: { type: ObjectId, ref: 'AppSysRole' },
      organizationId: { type: ObjectId, ref: 'Organization' },
      programId: { type: ObjectId, ref: 'Program' },
    },
    { minimize: false },
  ),
  'UserSysRole',
);

export default UserSysRoleModel;
