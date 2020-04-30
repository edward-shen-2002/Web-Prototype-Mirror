import { Schema, model } from 'mongoose';
import IAppSysDocument from './interface'

export default model<IAppSysDocument>(
  'AppSys',
  new Schema(
    {
      id                : { type: Number},

      code              : { type: String},

      name              : { type: String}
    },
    { minimize: false }
  )
)
