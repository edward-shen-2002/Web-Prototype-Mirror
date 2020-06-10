import { Schema, model } from "mongoose";

const AppRoleModel = model(
  "AppRole",
  new Schema(
    {
      code: { type: String },
      name: { type: String },
      isActive: { type: Boolean },
    },
    { minimize: false, autoIndex: true },
  ),
  "AppRole",
);

export default AppRoleModel;