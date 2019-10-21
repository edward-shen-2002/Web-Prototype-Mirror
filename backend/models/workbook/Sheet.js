import { Schema, model } from "mongoose";

let sheetSchema = new Schema({
  name: { type: String, required: true },
  attIds: [ Number ],
  catIds: [ Number ]
});

export default model("Sheet", sheetSchema);