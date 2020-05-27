import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const appSysSchema = new Schema({
  name: { type: String},
  code: {type: String, unique: true}

}, { minimize: false });

export default model("AppSys", appSysSchema, "AppSys");