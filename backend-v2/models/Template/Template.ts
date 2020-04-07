import { Schema, model, Document } from 'mongoose'
import ITemplateModel from './interface'

export default model<ITemplateModel>(
  'Template', 
  new Schema(
    {
      name: { type: String, required: true },
    
      year: { type: Number, required: true },
    
      reportPeriod: { type: String, required: true },
    
      submissionCategoryID: { type: Schema.Types.ObjectId, ref: 'SubmissionCategory' },
      workbookData: {},
    
      isPublished: { type: Boolean, default: false }
    }, 
    { minimize: false }
  )
)
