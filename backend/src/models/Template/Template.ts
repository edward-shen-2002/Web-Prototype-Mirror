import { Schema, model, Document } from 'mongoose'
import ITemplateDocument from './interface'

export default model<ITemplateDocument>(
  'Template', 
  new Schema(
    {
      name                  : { type: String, required: true },
    
      year                  : { type: Number, required: true },
    
      reportPeriod          : { type: String, required: true },
    
      submissionCategoryId  : { type: Schema.Types.ObjectId, ref: 'SubmissionCategory' },
      workbookData          : {},
    
      isPublished           : { type: Boolean, default: false }
    }, 
    { minimize: false }
  )
)
