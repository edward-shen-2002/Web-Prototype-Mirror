import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

let valueSchema = new Schema({
  organization: { type: ObjectId, ref: "Organization" },

  // values: { catId: { attId: value } }
  values: {} 
});

export default model("Value", valueSchema);