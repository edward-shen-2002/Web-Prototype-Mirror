import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let attributeSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  groups: [ ObjectId ]
});

export default model("Attribute", attributeSchema);