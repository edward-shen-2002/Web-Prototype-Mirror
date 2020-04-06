import { Schema, model } from "mongoose";

let groupSchema = new Schema({
  value: { type: String, required: true }
}, { minimize: false });

export default model("Group", groupSchema);
