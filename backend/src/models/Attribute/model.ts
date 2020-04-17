import { Schema, model } from 'mongoose'
import IAttributeDocument from './interface'

export default model<IAttributeDocument>(
  'Attribute', 
  new Schema(
    {
      value: { type: String, required: true }
    }, 
    { minimize: false }
  )
)
