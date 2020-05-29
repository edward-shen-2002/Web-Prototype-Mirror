import { Schema, model } from "mongoose";

let yearSchema = new Schema({
  value: { type: String }
}, { minimize: false });

export default model("Year", yearSchema);