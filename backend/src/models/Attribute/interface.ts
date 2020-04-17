import { Document } from 'mongoose'

export interface IAttribute {
  value: string
}

export default interface IAttributeDocument extends IAttribute, Document {}
