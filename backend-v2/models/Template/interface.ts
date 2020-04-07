import { Schema, Document } from 'mongoose'

interface ITemplate {
  name: string
  year: number
  reportPeriod: string
  submissionCategoryID: Schema.Types.ObjectId
  workbookData: object
  
  isPublished: boolean
}

export default interface ITemplateModel extends ITemplate, Document {}
