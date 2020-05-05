import { Schema, model } from 'mongoose';
import IAppResourceDocument from './interface'

export default model<IAppResourceDocument>(
  'AppResource',
  new Schema(
    {
      // id              : { type: Number},

      resourceName    : { type: String},

      resourcePath    : { type: String},

      contextRoot     : { type: String},

      isProtected     : { type: Boolean, default: false},
    },
    { minimize: false }
  )
)
