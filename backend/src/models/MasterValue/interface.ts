import { Document } from 'mongoose'
import { IId } from '../interface';

export interface IMasterValue {
  chartOfAccountGroupLeafId
  chartOfAccountId
  columnNameId
  value
}

export default interface IMasterValueDocument extends IMasterValue, Document {}
