import { Schema, model } from 'mongoose';
import IYearDocument from './interface';

export default model<IYearDocument>(
  'Year', 
  new Schema(
    {
      value: { type: String }
    }, 
    { minimize: false }
  )
);
