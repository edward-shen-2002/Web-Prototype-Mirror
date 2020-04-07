import { Schema, model } from "mongoose";

import IOrganizationGroupModel from './interface'

export default model<IOrganizationGroupModel>(
  "OrganizationGroup", 
  new Schema(
    {
      name: { type: String, required: true, unique: true }
    }, 
    { minimize: false }
  )
);