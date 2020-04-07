import { Schema, model } from "mongoose";
import IProgramModel from "./interface";

export default model<IProgramModel>(
  "Program", 
  new Schema(
    {
      name: { type: String, required: true, unique: true },
      code: String
    }, 
    { minimize: false }
  )
)