import { Schema, model } from 'mongoose';
import ICategoryGroupHierarchyModel from './interface';

export default model<ICategoryGroupHierarchyModel>(
  'CategoryGroupHierarchy', 
  new Schema(
    {
      submissionCategoryID: { type: Schema.Types.ObjectId, ref: 'SubmissionCategory' },
      hierarchy: { type: Object, default: {} }
    }, 
    { minimize: false }
  )
);
