import { Schema, model } from 'mongoose';
import IProgramDocument from './interface';

export default model<IProgramDocument>(
  'Program',
  new Schema(
    {
      id                  : { type: Number },

      name                : { type: String, required: true },
      code                : { type: String, required: true },

      organizationId      : [{ type: ObjectId, ref: 'Organization' }],

      isActive              : { type: Boolean, default: false },
    },
    { minimize: false }
  )
)
