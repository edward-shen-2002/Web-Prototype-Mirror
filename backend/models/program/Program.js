import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let programSchema = new Schema({
  name: { type: String, required: true},
  code: { type: String, required: true, unique: true },
  isActive: {type: Boolean}

}, { minimize: false });

export default model("Program", programSchema, "Program");