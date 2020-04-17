import { Schema, model } from 'mongoose';
import ICategoryGroupHierarchyDocument from './interface';

export default model<ICategoryGroupHierarchyDocument>(
  'CategoryGroupHierarchy', 
  new Schema(
    {
      submissionCategoryId  : { type: Schema.Types.ObjectId, ref: 'SubmissionCategory' },
      hierarchy             : { type: Object, default: {} }
    }, 
    { minimize: false }
  )
);
