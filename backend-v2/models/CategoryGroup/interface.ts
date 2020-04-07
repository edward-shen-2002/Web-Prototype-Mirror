import { Document } from 'mongoose'

interface ICategoryGroup {
  value: string
}

export default interface ICategoryGroupModel extends ICategoryGroup, Document {}
