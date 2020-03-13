import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let programSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, unique: true },
  users: [ { type: ObjectId, ref: "User" } ],
  submission: [ { type: ObjectId, ref: "Submission" } ],
}, { minimize: false });

export default model("Program", programSchema);