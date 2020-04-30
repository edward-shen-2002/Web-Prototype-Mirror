import { Schema, model } from 'mongoose';
import IAppRoleDocument from './interface'

export default model<IAppRoleDocument>(
  'AppRole',
  new Schema(
    {
      id                : { type: Number},

      code              : { type: String},

      name              : { type: String}
    },
    { minimize: false }
  )
)
