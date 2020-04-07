import { Schema, Document } from 'mongoose'

interface IMasterValue {
  organizationId: Schema.Types.ObjectId

  year: number
  reportPeriod: string
  form: string
  
  attributeID: Schema.Types.ObjectId
  categoryID: Schema.Types.ObjectId
  categoryGroupIDs: Array<Schema.Types.ObjectId>
  value: string
}

export default interface IMasterValueModel extends IMasterValue, Document {}
