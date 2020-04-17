import { Schema, model } from 'mongoose';
import IChartOfAccountsHierarchy from './interface';

const ObjectId = Schema.Types.ObjectId;

export default model<IChartOfAccountsHierarchy>(
  'ChartOfAccountsHierarchy', 
  new Schema(
    {

    }, 
    { minimize: false }
  )
)
