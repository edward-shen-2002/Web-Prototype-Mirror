import { Document } from 'mongoose';
import { IId } from '../interface';

export interface ICategoryGroupHierarchy {
  submissionCategoryId  : IId
  hierarchy             : object
}

export default interface ICategoryGroupHierarchyDocument extends ICategoryGroupHierarchy, Document {}