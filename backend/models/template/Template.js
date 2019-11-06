import { Schema, model } from "mongoose";

// const ObjectId = Schema.Types.ObjectId;

let templateSchema = new Schema({
  name: { type: String, required: true },

  file: { type: String },

  sheets: [{
    name: { type: String },

    // ! attributes: { $id: { position, value, ... } }
    attributes: {},
  
    // ! categories: { $id: { position, value, ... } }
    categories: {}
  }]
}, { minimize: false });

export default model("Template", templateSchema);
