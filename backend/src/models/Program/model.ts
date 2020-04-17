import { Schema, model } from 'mongoose';
import IProgramDocument from './interface';

export default model<IProgramDocument>(
  'Program', 
  new Schema(
    {
      name: { type: String, required: true, unique: true },
      code: String
    }, 
    { minimize: false }
  )
)