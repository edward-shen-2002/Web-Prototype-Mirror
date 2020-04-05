import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let programSchema = new Schema({
  name: { type: String, required: true, unique: true },
  shortName: { type: String, required: true },
  organization: [{type: String, required: true}],

}, { minimize: false });

export default model("Program", programSchema);