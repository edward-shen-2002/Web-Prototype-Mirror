import { Document } from 'mongoose'

interface ICategoryGroup {
  value: string
}

export default interface ICategoryGroupDocument extends ICategoryGroup, Document {}
