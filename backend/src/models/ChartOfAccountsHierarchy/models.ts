import { Schema, model } from 'mongoose';
import IChartOfAccountsHierarchy from './interface';

const ObjectId = Schema.Types.ObjectId;

const ChartOfAccountsHierarchyModel = model<IChartOfAccountsHierarchy>(
  'ChartOfAccountsHierarchy', 
  new Schema(
    {

    }, 
    { minimize: false }
  )
)

export default ChartOfAccountsHierarchyModel