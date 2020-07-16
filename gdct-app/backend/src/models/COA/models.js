import { Schema, model } from 'mongoose';

const COAModel = model(
  'COA',
  new Schema(
    {
      name: { type: String },
    },
    { minimize: false },
  ),
  'COA',
);

export default COAModel;
