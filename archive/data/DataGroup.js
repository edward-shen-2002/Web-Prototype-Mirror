import { Schema, model } from "mongoose";

/**
 * Group represents the group of a cell
 */
let dataGroupSchema = new Schema({
  title: { type: String, required: true },
  children: { type: Array, default: [] }
});

export default model("DataGroup", dataGroupSchema);