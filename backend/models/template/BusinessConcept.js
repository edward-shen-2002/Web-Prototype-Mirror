import { Schema, model } from "mongoose";

let businessConceptSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  value: { type: String, required: true }
}, { minimize: false });

export default model("BusinessConcept", businessConceptSchema);
