import { Schema, Document } from 'mongoose'
import { IId } from '../interface';

export interface IMasterValue {
  organizationId    : IId

  year              : number
  reportPeriod      : string
  form              : string
  
  attributeId       : IId
  categoryId        : IId
  categoryGroupIds  : Array<IId>
  value             : string
}

export default interface IMasterValueDocument extends IMasterValue, Document {}
