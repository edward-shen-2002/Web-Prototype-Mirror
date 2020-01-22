import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

/**
 * Contains the values of successfully approved workbooks
 * 
 * Example: 
 * {
 *   organizationCode: "995",
 *   sectorName: "Health",
 *   year: 2010,
 *   quarter: "4",
 *   ...
 * }
 * 
 * Since this is a very general schema, we can optimize this by index optimization to:
 * 
 * {
 *   $_sectorName_: {
 *     $_organizationCode_: {
 *       $_year_ : {
 *         attributePosition: $_attributePosition_,
 *         categoryPosition: $_cateogryPosition_,
 *         ..._otherOptionals_...,
 *         quarter: $_quarter_
 *       }
 *     }
 *   }
 * }
 * 
 * This is just one example of indexing and is not fully optimized or researched. 
 * However, it is much more efficient than a flat list due to the fact that it acts as a multi-layer map and reduces the search results on every index layer.
 */

let masterValueSchema = new Schema({
  organizationId: { type: ObjectId, required: true },

  year: { type: Number, required: true },
  quarter: { type: String },
  
  businessConceptId1: { type: ObjectId, required: true },
  businessConceptId2: { type: ObjectId, required: true },

  value: { type: String, required: true }
}, { minimize: false });

export default model("MasterValue", masterValueSchema);
