import { Schema, model } from "mongoose";

let templateSchema = new Schema({
  name: { type: String, required: true },

  file: { type: String },

  sheets: [{
    name: { type: String },

    // ! attributes: { $id: { position, value, ... } }
    attributes: {},
  
    // ! categories: { $id: { position, value, ... } }
    categories: {}

    // ! Are templates, solely templates - they contain the categories and attributes to fill cells up?
  }]
}, { minimize: false });

export default model("Template", templateSchema);
