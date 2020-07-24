import { Schema, model } from 'mongoose';

const ColumnNameModel = model(
  'Attribute',
  new Schema(
    {
      value: { type: String, required: true },
    },
    { minimize: false },
  ),
  'Attribute',
);

export default ColumnNameModel;
