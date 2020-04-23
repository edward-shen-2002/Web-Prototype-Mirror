import { Schema, model } from 'mongoose';
import IStatusDocument from './interface';

const StatusModel = model<IStatusDocument>(
  'Status', 
  new Schema(
    {
      name          : { type: String, required: true },
      description   : { type: String },
      isActive      : { type: Boolean }
    }, 
    { minimize: false, timestamps: true }
  )
)

export default StatusModel
