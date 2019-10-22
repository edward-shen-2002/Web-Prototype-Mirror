import { Schema, model } from "mongoose";

/**
 * Attributes
 * ===========
 * title: the title of the group or value 
 * type: One of [ group, value ]
 * children: Array of sub groups/values
 */
let dataGroupSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  children: { type: Array, default: [] }
});

export default model("DataGroup", dataGroupSchema);