import { Schema, model } from "mongoose";

let templateSchema = new Schema({
  name: { type: String, required: true },

  fileStates: {},

  published: { type: Boolean, default: false }
}, { minimize: false });

export default model("Template", templateSchema);
