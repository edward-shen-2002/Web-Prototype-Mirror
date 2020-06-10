import { Document } from 'mongoose'
import { IId } from '../interface'

export interface IMasterValue {
  submissionId: IId
  COATreeId: IId
  COAId: IId
  columnNameId: IId
  value: string
}

export default interface IMasterValueDocument extends IMasterValue, Document {}
