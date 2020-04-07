import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let programSchema = new Schema({
  name: { type: String, required: true, unique: true },
  code: String
}, { minimize: false });

export default model("Program", programSchema);