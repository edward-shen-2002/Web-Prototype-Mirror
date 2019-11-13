import { Schema, model } from "mongoose";

/**
 * Contains the values of workbooks that have not yet been approved.
 * 
 * Values will remain here even when rejected. It is only removed once the workbook have been approved or deleted.
 * 
 * Example: 
 * {
 *   organizationCode: "995",
 *   sectorName: "Health",
 *   year: 2010,
 *   quarter: "4",
 *   templateName: "Budget Request",
 *   sheetName: "Balance Sheet",
 *   sheetOrder: 7,
 *   attributePosition: "AB",
 *   categoryPosition: "5"
 * }
 * 
 * Since this is a very general schema, we can optimize this by index optimization to:
 * 
 * {
 *   $_sectorName_: {
 *     $_organizationCode_: {
 *       $_year_ : {
 *         $_templateName_: {
 *           $_sheetName_: {
 *             sheetOrder: $_sheetOrder_,
  *            quarter: $_quarter_,
  *            attributePosition: $_attributePosition_,
  *            categoryPosition: $_cateogryPosition_,
  *            ..._otherOptionals_...
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * 
 * This is just one example of indexing and is not fully optimized or researched. 
 * However, it is much more efficient than a flat list due to the fact that it acts as a multi-layer map and reduces the search results on every index layer.
 */

let masterValueSchema = new Schema({
  organizationCode: { type: String, required: true },

  sectorName: { type: String, required: true },

  year: { type: Number, required: true },

  quarter: { type: String },

  templateName: { type: String, required: true },

  attributeId: { type: String, required: true },
  categoryId: { type: String, required: true },

  value: { type: String, required: true }
}, { minimize: false });

export default model("UnofficialMasterValue", masterValueSchema);
