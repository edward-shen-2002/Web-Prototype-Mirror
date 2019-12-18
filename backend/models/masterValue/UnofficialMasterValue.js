import { Schema, model } from "mongoose";

let masterValueSchema = new Schema({
  organizationCode: { type: String, required: true },

  sectorName: { type: String, required: true },

  year: { type: Number, required: true },

  quarter: { type: String },

  attributeId: { type: String, required: true },
  categoryId: { type: String, required: true },

  value: { type: String, required: true }
}, { minimize: false });

export default model("UnofficialMasterValue", masterValueSchema);
