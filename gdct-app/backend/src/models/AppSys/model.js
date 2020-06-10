import { Schema, model } from "mongoose";

const AppSysModel = model(
  "AppSys",
  new Schema(
    {
      code: { type: String },
      name: { type: String },
      isActive: { type: Boolean },
    },
    { minimize: false },
  ),
  "AppSys",
);

export default AppSysModel;