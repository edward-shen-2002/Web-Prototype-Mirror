import { Schema, Document } from 'mongoose'
import { IId } from '../interface';

export interface ITemplate {
  name                  : string
  year                  : number
  reportPeriod          : string
  submissionCategoryId  : IId
  workbookData          : object
  
  isPublished           : boolean
}

export default interface ITemplateDocument extends ITemplate, Document {}
