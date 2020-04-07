import { Schema, model } from "mongoose";

export default model(
  "Year", 
  new Schema(
    {
      value: { type: String }
    }, 
    { minimize: false }
  )
);
