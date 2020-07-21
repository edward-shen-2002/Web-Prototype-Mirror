import { Schema, model } from 'mongoose';

const AppResourceModel = model(
  'AppResource',
  new Schema(
    {
      name: { type: String },
      path: { type: String },
      contextRoot: { type: String },
      isProtected: { type: Boolean },
    },
    { minimize: false, autoIndex: true },
  ),
  'AppResource',
);

export default AppResourceModel;
