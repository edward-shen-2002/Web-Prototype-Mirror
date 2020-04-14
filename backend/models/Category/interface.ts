import { Document } from 'mongoose'

interface ICategory {
  value: string
}

export default interface ICategoryDocument extends ICategory, Document {}
