import { Schema, model } from 'mongoose'
import IMasterValueDocument from './interface'

const ObjectId = Schema.Types.ObjectId

/**
 * Contains the values of successfully approved workbooks
 *
 * Example:
 * {
 *   organizationCode: '995',
 *   sectorName: 'Health',
 *   year: 2010,
 *   quarter: '4',
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
const MasterValueModel = model<IMasterValueDocument>(
  'MasterValue',
  new Schema(
    {
      submissionId: { type: ObjectId, ref: "Submission" },
      // COATreeId: { type: ObjectId, ref: "COATree" },
      // COAId: { type: ObjectId, ref: "COA" },
      // columnNameId: { type: ObjectId, ref: "ColumnName" },

      COATreeId: { type: String },
      COAId: { type: String },
      columnNameId: { type: String },

      value: { type: String }
    },
    { minimize: false }
  ),
  'MasterValue'
)

export default MasterValueModel
