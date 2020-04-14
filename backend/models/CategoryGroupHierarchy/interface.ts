import { Schema, model, Document } from 'mongoose';

interface ICategoryGroupHierarchy {
  submissionCategoryID  : Schema.Types.ObjectId;
  hierarchy             : object
}

export default interface ICategoryGroupHierarchyDocument extends ICategoryGroupHierarchy, Document {}