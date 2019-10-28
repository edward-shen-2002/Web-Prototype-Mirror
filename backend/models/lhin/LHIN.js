import { Schema, model } from "mongoose";

const lhinSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

export default model("LHIN", lhinSchema);
