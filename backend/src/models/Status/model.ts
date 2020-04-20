import { Schema, model } from 'mongoose';
import IStatusDocument from './interface';

const ObjectId = Schema.Types.ObjectId;

const StatusModel = model<IStatusDocument>(
  'Status', 
  new Schema(
    {
      value: { type: String, required: true }
    }, 
    { minimize: false, timestamps: true }
  )
)

export default StatusModel