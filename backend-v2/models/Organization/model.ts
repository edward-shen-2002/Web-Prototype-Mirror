import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

export default model(
  "Organization", 
  new Schema(
    {
      name: { type: String, required: true },
      code: { type: String, required: true, unique: true },
      address: { type: String, default: "" },
      
      organizationGroupID: { type: ObjectId, ref: "OrganizationGroup" },
    
      managerUserIDs: [ { type: ObjectId, ref: "User" } ],
      contactUserID: { type: ObjectId, ref: "User" },
      authorizedUserID: { type: ObjectId, ref: "User" },
    
      location: { type: String, default: "" },
    
      programIDs: [ { type: ObjectId, ref: "Program" } ]
    }, 
    { minimize: false }
  )
);
