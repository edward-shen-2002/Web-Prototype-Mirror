import { Document } from 'mongoose'

interface IAttribute {
  value: string
}

export default interface IAttributeDocument extends IAttribute, Document {}
