import { Schema, model } from "mongoose";

// Sector is one level above organization. A sector can contain a group of organizations, 
// ?and organizations can only belong in one sector?
const sectorSchema = new Schema({
  name: { type: String, required: true, unique: true }
}, { minimize: false });

export default model("Sector", sectorSchema);
