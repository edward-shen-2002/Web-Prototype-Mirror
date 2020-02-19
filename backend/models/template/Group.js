import { Schema, model } from "mongoose";

let groupSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  value: { type: String, required: true }
}, { minimize: false });

export default model("Group", groupSchema);
