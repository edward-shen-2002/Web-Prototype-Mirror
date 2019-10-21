import { Schema, model } from "mongoose";

let attributeGroupSchema = new Schema({
  name: { type: String, required: true },
  values: [ String ]
});

export default model("AttributeGroup", attributeGroupSchema);